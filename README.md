# Utherverse Presale NFT — API

Backend API for the **Utherverse NFT presale sales page**. It powers the public sales page
(landing data, order placement, discounts, Stripe payment intents, on-chain transaction
tracking) and provides authenticated customer and admin areas (transactions, affiliate
network, commissions, OTP/TOTP login).

Built with **Node.js + TypeScript + Express** on **MongoDB (Mongoose)**, deployable as a
long‑running Node server or as a **Vercel serverless** function.

---

## Table of contents

- [Purpose](#purpose)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Data model](#data-model)
- [API reference](#api-reference)
- [Core business rules](#core-business-rules)
- [Environment variables](#environment-variables)
- [Getting started](#getting-started)
- [Build & run](#build--run)
- [Deployment](#deployment)
- [Security notes](#security-notes)
- [Known gaps / TODOs](#known-gaps--todos)

---

## Purpose

Utherverse runs a timed **NFT presale** split into *rounds*. Each round belongs to an
NFT type, has a duration, and exposes a set of *round values* that define price and
inventory for three buyer segments:

| Segment | Who | Discount |
| --- | --- | --- |
| **Trunk holder** | Wallets pre-registered in `trunk_holders` | Configurable `%` off |
| **Fast (early bird)** | Buyers landing on the sales page within the first N hours | Configurable `%` off |
| **Retail** | Everyone else | List price |

On top of the storefront, the API handles a two‑level **referral/affiliate** programme
that pays commissions when a referred customer completes a purchase, plus customer
self-service (transaction history, affiliate list, commission history) and an admin
login protected by **email OTP** and **TOTP 2FA**.

This repository contains **only the API**. The sales page front-end is a separate client
that talks to this service — note that all public traffic is **AES‑encrypted at the
payload level** (see [Encryption](#encryption)).

---

## Features

- **Sales page bootstrap** — returns NFT types, their NFTs, the latest round and the
  caller's *consumed time* (used to decide fast-discount eligibility).
- **Order placement** — validates the round is still live, computes per-segment discounts,
  decrements round inventory, and stores the order with an encrypted target wallet.
- **Per‑IP first-landing tracking** — the first time an IP lands on a round, a
  `first_round_landings` record is created; the fast-discount window is measured from it.
- **Trunk-holder verification** — wallet-address lookup for the discounted tier.
- **Stripe payment intents** — creates/reuses a Stripe customer and a PaymentIntent per
  order, persisted locally.
- **Transaction lifecycle** — create/update transactions for Stripe, ACH, BSC, SOL and ETH
  chains; commissions are applied when a transaction is updated successfully.
- **Referral commissions** — 8% to the parent and 4% to the grand-parent referrer.
- **Auth** — JWT access/refresh tokens for customers; admin login with email OTP +
  TOTP (speakeasy) verification.
- **Transactional e-mail** — OTP and registration/confirmation mails via Nodemailer with
  HTML templates.
- **Pagination & filtering** — generic aggregation-pipeline paginator with `_min`/`_max`,
  `_like`, `_sort_` and `_or_` query operators.
- **Central error handling** — custom exceptions map to meaningful HTTP status codes.

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Language | TypeScript 5.7 (CommonJS, `strict`) |
| Runtime | Node.js 18+ (developed on Node 22) |
| HTTP | Express 4, CORS, body-parser |
| Database | MongoDB + Mongoose 8 (Atlas or self-hosted) |
| Payments | Stripe SDK (`stripe@17`) |
| Auth | `jsonwebtoken`, `bcrypt`, `speakeasy` (TOTP) |
| Crypto | `crypto-js` (AES) for payload/wallet encryption |
| Mail | `nodemailer` + HTML templates |
| Dev tooling | `nodemon`, `ts-node`, `typescript` |
| Hosting | Vercel serverless (`@vercel/node`) or any Node host |

---

## Architecture

The project follows a **layered, dependency-injected architecture**. Each layer only
talks to the layer below it:

```
HTTP request
   │
   ▼
Routes            src/routes/**            ← URL → controller binding
   │
   ▼
Middlewares       src/middlewares/**       ← IP check, JWT auth, encrypt/decrypt
   │
   ▼
Controllers       src/controllers/**       ← request/response shaping only
   │
   ▼
Services          src/services/**          ← business logic & orchestration
   │
   ▼
Repositories      src/repositories/**      ← generic + domain data access
   │
   ▼
Models            src/database/models/**   ← Mongoose schemas
```

Supporting modules:

- `src/database/relations` — reusable `$lookup` definitions for aggregation pipelines.
- `src/database/projections` — field whitelists used when listing customers, NFTs, etc.
- `src/database/queries` — pre-built aggregation pipelines per list endpoint.
- `src/interfaces/models` — TypeScript contracts for every Mongoose document.
- `src/types` — request/response DTO types.
- `src/exceptions` — one exception class per error case, each carrying an HTTP status.
- `src/constants` & `src/enums` — magic values, env access and shared enums.
- `src/utils` — stateless helpers (JWT, AES, pagination, time, validation, email).
- `src/mailers` — Nodemailer transport and email composition.

### Two entry points

| File | Purpose |
| --- | --- |
| `src/index.ts` | **Long-running server.** Connects to MongoDB, mounts middleware, calls `app.listen(PORT)`. |
| `src/app.ts` | **Serverless entry point** (Vercel). Exports the Express `app`; no `listen`. |

### Request pipeline

1. `validate-ip` — resolves the client IP (via `request-ip`) into `req.checkedIp`; throws
   `IpNotFoundException` when it cannot be determined. Every `/api` route passes through it.
2. `decrypt-sales-page-request` — **public routes only.** For `POST`/`PUT`, the body must
   contain a `payload` field; it is AES-decrypted and replaces `req.body`.
3. `validate-customer` — verifies the `Authorization: Bearer <jwt>` token and loads the
   customer into `req.customer`. Public routes run it in *non-strict* mode (customer is
   optional), customer routes run it strictly.
4. `encrypt-sales-page-response` — **public routes only.** Overrides `res.send` so the
   response body is wrapped as `{ message, payload }` where `payload` is AES-encrypted.
5. Controller → Service → Repository → MongoDB.
6. `errorHandler` — maps `CustomException` to its status code, Mongo duplicate-key errors
   to `400`, anything else to `500 Internal Server Error`.

---

## Project structure

```
.
├── src/
│   ├── index.ts                    # Long-running server entry point
│   ├── app.ts                      # Serverless (Vercel) entry point
│   ├── commands/
│   │   └── settlement.command.ts   # Stub for order settlement (dev-only cron hook)
│   ├── constants/                  # auth, commission, currency, email, env, jwt, numbers, time
│   ├── controllers/
│   │   ├── Controller.ts           # Base controller (prepareSuccess)
│   │   ├── PublicController.ts     # Sales-page / order / transaction endpoints
│   │   ├── admin/AuthController.ts # Admin login, OTP, 2FA
│   │   └── customer/               # Auth, Transaction, Affiliate, Commission
│   ├── database/
│   │   ├── models/                 # Mongoose schemas (13 collections)
│   │   ├── projections/            # Field whitelists for list endpoints
│   │   ├── queries/                # Aggregation pipelines per list endpoint
│   │   └── relations/              # Shared $lookup definitions
│   ├── enums/                      # ApplicationModes, CommissionType, ChainType, ...
│   ├── exceptions/                 # CustomException subclasses (one per error case)
│   ├── interfaces/
│   │   ├── models/                 # Document interfaces
│   │   └── request.interface.ts    # Extended Express Request types
│   ├── mailers/                    # Mailer (transport) + AuthMailer
│   ├── messages/                   # Shared success/error message strings
│   ├── middlewares/                # IP, customer, admin, encrypt/decrypt middlewares
│   ├── repositories/               # Generic Repository<T> + per-collection repositories
│   ├── routes/
│   │   ├── index.ts                # Mounts /api
│   │   └── api/                    # public.api, customer.api, admin.api + sub-routers
│   ├── services/                   # Business logic (Auth, NftOrder, Stripe, Commission, ...)
│   ├── static-files/               # logo + HTML e-mail templates
│   ├── types/                      # DTO / request types
│   └── utils/                      # JWT, AES, pagination, OTP, time, validation, e-mail
├── dist/                           # Compiled output (tsc)
├── .env.example                    # Environment variable template
├── vercel.json                     # Vercel serverless build config
├── tsconfig.json
└── package.json
```

---

## Data model

| Collection | Model | Purpose |
| --- | --- | --- |
| `nft_types` | `nft-type.model.ts` | Top-level NFT category (e.g. a collection tier) |
| `nfts` | `nft.model.ts` | Individual NFT: name, booth count, `nft_type_id` |
| `nft_rounds` | `nft-round.model.ts` | Sale round: `duration_days`, `fast_discount_duration_hours` |
| `nft_round_values` | `nft-round-value.model.ts` | Price & inventory per round/NFT: retail/trunk/fast totals, sold counters, discount percentages |
| `nft_orders` | `nft-order.model.ts` | Purchase order: units, per-segment consumption, discount amounts, status (`PENDING`/`PAID`/`REVERTED`) |
| `first_round_landings` | `first-round-landing.model.ts` | One row per (IP, round) — anchors the fast-discount timer |
| `trunk_holders` | `trunk-holder.model.ts` | Wallet addresses eligible for the trunk-holder tier |
| `transactions` | `transaction.model.ts` | Payment/on-chain records: amount, currency, chain, hash, status, mint status |
| `customers` | `customer.model.ts` | Customer accounts: EVM + Solana wallets, referral tree (`parent_id`, `grand_parent_id`) |
| `admins` | `admin.model.ts` | Admin accounts: OTP state, TFA secret and verification flags |
| `referrals` | `referrals.model.ts` | Referral codes with usage counts |
| `commissions` | `commission.model.ts` | Commission ledger rows (`parent` / `grand_parent`) |
| `stripe_customers` | `stripe-customer.model.ts` | Local mirror of Stripe customer IDs |
| `stripe_payment_intents` | `stripe-payment-intent.model.ts` | PaymentIntent records linked to an order |

---

## API reference

Base path: **`/api`**. Responses are `200 OK` with a JSON body; errors are
`{ "message": "..." }` with an appropriate status code.

### Public — sales page (`/api`)

Requests are **encrypted**: the body must be `{ "payload": "<aes-encrypted-json>" }`.
Responses are returned as `{ "message"?, "payload": "<aes-encrypted-json>" }`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/nft-sales-page-params` | NFT types + NFTs + latest round + caller's consumed time |
| `GET` | `/referral-info/:refferalId` | Referral code info (name, counts) |
| `POST` | `/round-values` | Round value (price + inventory) for a `round_id` + `nft_id` |
| `POST` | `/check-trunk-holder` | Whether a `wallet_address` is a trunk holder |
| `POST` | `/place-order` | Validate + create an NFT order, decrementing inventory |
| `POST` | `/stripe-payment-intent` | Create a Stripe PaymentIntent for an order |
| `POST` | `/create-transaction` | Record a transaction (Stripe/ACH/BSC/SOL/ETH) |
| `POST` | `/update-transaction` | Update a transaction (hash/status); applies commissions |

### Customer — authenticated (`/api/customer`)

Requires `Authorization: Bearer <access_token>` (except the auth routes).

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/login` | Customer login → access + refresh tokens |
| `POST` | `/auth/registration` | Register a customer; a random password is e-mailed |
| `GET` | `/transactions` | Paginated transaction history (`?page=&limit=` + filters) |
| `GET` | `/affiliates` | Paginated list of directly referred customers |
| `GET` | `/commissions` | Paginated list of commissions earned |

### Admin — authenticated (`/api/admin`)

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/login` | Admin login → tokens + OTP e-mailed |
| `POST` | `/auth/verify-otp` | Verify the e-mailed OTP (10-minute expiry) |
| `POST` | `/auth/verify-2fa` | Verify the TOTP code |

---

## Core business rules

### Pricing & discounts

`src/utils/nft-order.utils.ts` implements the pricing model.

```
netAmount        = retail_price × units
fastDiscount     = (retail_price / 100) × fast_discount_percentage        (per unit)
trunkDiscount    = ((netAmount - fastDiscount) / 100) × trunk_discount_percentage  (per unit)
totalPrice       = netAmount - (trunkDiscount × trunkUnits) - (fastDiscount × fastUnits)
```

- `totalPrice` submitted by the client **must** equal the computed value, otherwise
  `OrderAmountValidationFailedException` is thrown — the server never trusts the price.
- Units are allocated per segment: trunk units first (if the buyer is a trunk holder),
  then fast units (if inside the fast window), the remainder as retail units.
- If the combined fast + retail inventory is below the requested units,
  `NotEnoughQuantityAvailableException` is thrown.
- Inventory is decremented with a single atomic `findOneAndUpdate` (`$inc` on the three
  `*_quantity_sold` counters).

### Round timing

- A round is open for `duration_days` from the caller's first landing
  (`first_round_landings.createdAt`); afterwards `RoundEndedException` is thrown.
- The fast (early-bird) discount applies while
  `elapsed < fast_discount_duration_hours × 3600`.

### Referral commissions

Applied on `POST /api/update-transaction`:

| Level | Percentage | Constant |
| --- | --- | --- |
| Parent referrer | 8% | `PARENT_COMMISSION_PERCENTAGE` |
| Grand-parent referrer | 4% | `GRAND_PARENT_COMMISSION_PERCENTAGE` |

`CommissionService.applyCommissions` refuses to run twice for the same transaction
(`CommissionAlreadyGivenException`) and resolves the referrer chain through the
customer's `parent_id` / `grand_parent_id` fields.

### Encryption

| Data | Key | Where |
| --- | --- | --- |
| Public request/response payloads | `SALES_PAGE_ENCRYPTION_KEY` | `encrypt-sales-page-*` middlewares |
| Order target wallet | `TARGET_WALLET_ENCRYPTION_KEY` | `encryptTargetWallet()` in `NftOrderService` |

Both use AES via `crypto-js`. The encrypted target wallet is stored alongside the plain
value in `nft_orders`.

---

## Environment variables

Copy `.env.example` to `.env` and fill in the values. All variables are read through
`src/constants/env.constant.ts`.

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `NODE_ENV` | No | `dev` | `dev` enables the settlement command hook at boot |
| `PORT` | No | `3000` | Port for the long-running server |
| `MONGO_URI` | **Yes** | – | MongoDB connection string (Atlas SRV or self-hosted) |
| `STRIPE_SECRET_KEY` | **Yes** (for Stripe routes) | – | Stripe secret API key |
| `STRIPE_WEBHOOK_SECRET` | Recommended | – | Stripe webhook signing secret |
| `SALES_PAGE_ENCRYPTION_KEY` | **Yes** (public routes) | – | AES key for sales-page payloads |
| `TARGET_WALLET_ENCRYPTION_KEY` | **Yes** (place-order) | – | AES key for target wallets |
| `JWT_ACCESS_TOKEN_SECRET` | **Yes** | – | Signing secret for access tokens (1 day) |
| `JWT_REFRESH_TOKEN_SECRET` | **Yes** | – | Signing secret for refresh tokens (7 days) |
| `AUTH_SALT` | **Yes** | – | bcrypt salt rounds used by `hashPassword` |
| `EMAIL_HOST` | **Yes** (e-mail routes) | – | SMTP host |
| `EMAIL_PORT` | No | `465` | SMTP port |
| `EMAIL_SECURE` | No | `false` | TLS flag for SMTP |
| `EMAIL_USER` | **Yes** (e-mail routes) | – | SMTP username |
| `EMAIL_PASSWORD` | **Yes** (e-mail routes) | – | SMTP password |

> **Note:** `.env.example` in this repository contains previously committed credential
> values. Treat them as compromised — rotate the MongoDB, Stripe and SMTP credentials and
> keep real secrets out of version control (`.env` is already git-ignored).

---

## Getting started

### Prerequisites

- Node.js 18 or newer (Node 22 recommended)
- npm (or Yarn — both `package-lock.json` and `yarn.lock` are present)
- A MongoDB instance (MongoDB Atlas free tier is enough)
- Optional: a Stripe test account and an SMTP mailbox (Mailtrap / SES)

### Install

```bash
git clone https://github.com/jawadmaqbool3/utherverse-presale-nft-type-script.git
cd utherverse-presale-nft-type-script
npm install          # or: yarn install
```

### Configure

```bash
cp .env.example .env
# then edit .env with your own MONGO_URI, secrets, Stripe and SMTP credentials
```

### Run in development

```bash
npm run dev
```

`nodemon` watches `src/` and restarts the server on change. The API is served on
`http://localhost:${PORT}` (default `3000`, `3001` in `.env.example`).

### Seed reference data

The API does not seed the database. Create the following documents (directly in MongoDB
or via a script) before the sales page will return meaningful data:

1. `nft_types` — e.g. `{ "name": "Genesis" }`
2. `nfts` — `{ "name": "Utherverse #1", "booths": 1, "nft_type_id": <nft_type_id> }`
3. `nft_rounds` — `{ "name": "Round 1", "nft_type_id": <nft_type_id>,
   "duration_days": 7, "fast_discount_duration_hours": 24 }`
4. `nft_round_values` — `{ "round_id": <round_id>, "nft_id": <nft_id>,
   "retail_price": 100, "retail_quantity_total": 100, "trunk_quantity_total": 50,
   "fast_discount_quantity_total": 50, "trunk_discount_percentage": 10,
   "fast_discount_percentage": 5 }`
5. `trunk_holders` — `{ "wallet_address": "0x..." }` for each discounted wallet
6. `admins` — an admin document with a bcrypt-hashed `password` (and optionally
   `is_email_otp_enabled` / `is_tfa_enabled` / `tfa_secret`)

---

## Build & run

```bash
npm run build     # tsc → dist/
npm run serve     # node dist/index.js
```

`npm start` currently points at `src/index.js`, which does not exist in this TypeScript
project — use `npm run dev` in development and `npm run build && npm run serve` in
production, or fix the script to `node dist/index.js`.

Useful checks:

```bash
npx tsc --noEmit   # type-check without emitting
```

---

## Deployment

### Option A — Vercel (serverless, recommended for this repo)

`vercel.json` builds `src/app.ts` with `@vercel/node` and routes every path to it.
`src/app.ts` exports the Express app without calling `listen`, which is exactly what a
serverless function expects.

1. Push the repository to GitHub and import it in Vercel.
2. Add every variable from [Environment variables](#environment-variables) under
   **Project → Settings → Environment Variables** (mark secrets as *Sensitive*).
3. Deploy. Vercel installs dependencies and builds automatically; the function is served
   at `https://<project>.vercel.app`.

Notes:
- The Mongo connection is established inside the function's `serviceInit()`; use a
  connection-pool-friendly `MONGO_URI` and consider `mongoose.connect` retry options for
  cold starts.
- Vercel functions are stateless — nothing may rely on an in-process scheduler. The
  `settlement.command.ts` hook therefore only runs in `NODE_ENV=dev`.
- Adjust the function's max duration and memory in **Settings → Functions** if your
  aggregation pipelines are heavy.

### Option B — Traditional Node host (VPS, EC2, Railway, Render, Fly.io, etc.)

```bash
npm ci
npm run build
NODE_ENV=prod PORT=3000 node dist/index.js
```

Run it behind a process manager (pm2/systemd) and terminate TLS at a reverse proxy
(Nginx/Caddy). `src/index.ts` is the entry point for this mode.

```bash
# pm2 example
pm2 start dist/index.js --name utherverse-presale --env production
pm2 save && pm2 startup
```

### Post-deployment checklist

- [ ] Rotate every credential that has ever been committed (Mongo, Stripe, SMTP, JWT secrets).
- [ ] Confirm `SALES_PAGE_ENCRYPTION_KEY` / `TARGET_WALLET_ENCRYPTION_KEY` match the
      values configured in the sales-page front-end, otherwise payloads fail to decrypt.
- [ ] Confirm CORS origins — `app.use(cors())` currently allows **all** origins; restrict
      it to the sales-page domain before going live.
- [ ] Configure the Stripe webhook to call the relevant endpoint and verify signatures
      with `STRIPE_WEBHOOK_SECRET`.
- [ ] Verify SMTP works (OTP and registration mails) and that the sender domain is
      authorised.
- [ ] Seed `admins`, `trunk_holders` and the NFT catalogue in the production database.

---

## Security notes

- Passwords are hashed with **bcrypt** (`AUTH_SALT`).
- Access tokens expire in **1 day**, refresh tokens in **7 days**; both are signed with
  separate JWT secrets.
- Admin OTPs expire after **10 minutes** and are single-use (the code is nulled on success).
- Admin 2FA uses **TOTP** (speakeasy) and can be toggled per admin via
  `is_email_otp_enabled` / `is_tfa_enabled`.
- Order target wallets are stored AES-encrypted (`encrypted_target_wallet`).
- Public payloads are AES-encrypted in transit at the application layer.
- The bearer token is read from the `Authorization` header, falling back to the `auth` cookie.

---

## Known gaps / TODOs

- `src/commands/settlement.command.ts` is an **empty stub** — order settlement / minting
  is not implemented yet. It is invoked only when `NODE_ENV=dev`.
- `npm start` points to a non-existent `src/index.js` (see [Build & run](#build--run)).
- `createRefreshToken` signs with `JWT_ACCESS_TOKEN_SECRET` rather than
  `JWT_REFRESH_TOKEN_SECRET` (see `src/utils/jwt.ts`) — worth correcting.
- `CommissionService.applyCommissions` has a control-flow bug: the `if (!referral_id &&
  !customer_id)` block is neither terminated nor followed by an `else`, so the referral
  branch only runs when a referral id is present.
- `src/middlewares/validate-if-customer-token.middleware.ts` is currently unused.
- No automated tests are present in this repository.
- `.env.example` ships with real-looking secrets — rotate them and replace the file with
  placeholder values.
