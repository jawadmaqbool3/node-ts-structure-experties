"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MintStatus = exports.ChainType = exports.TransactionStatus = exports.CurrencyTypes = exports.NetworkType = void 0;
var NetworkType;
(function (NetworkType) {
    NetworkType["MAINNET"] = "main_net";
    NetworkType["DEVNET"] = "dev_net";
})(NetworkType || (exports.NetworkType = NetworkType = {}));
var CurrencyTypes;
(function (CurrencyTypes) {
    CurrencyTypes["USDT"] = "USDT";
})(CurrencyTypes || (exports.CurrencyTypes = CurrencyTypes = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "PENDING";
    TransactionStatus["SUCCESS"] = "SUCCESS";
    TransactionStatus["FAILED"] = "FAILED";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
var ChainType;
(function (ChainType) {
    ChainType["STRIPE"] = "stripe";
    ChainType["ACH"] = "ach";
    ChainType["BSC"] = "bsc";
    ChainType["SOL"] = "sol";
    ChainType["ETH"] = "eth";
})(ChainType || (exports.ChainType = ChainType = {}));
var MintStatus;
(function (MintStatus) {
    MintStatus["PENDING"] = "PENDING";
    MintStatus["SUCCESS"] = "SUCCESS";
    MintStatus["FAILED"] = "FAILED";
})(MintStatus || (exports.MintStatus = MintStatus = {}));
