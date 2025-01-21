export type TAuthUser = {
    _id: string,
    first_name: string,
    last_name?: string | null,
    email: string,
    is_tfa_verified: boolean | undefined,
    is_email_otp_verified: boolean | undefined
}
export type TAuthReponse = {
    access_token: string,
    refresh_token: string,
    expires_in: number,
    user: TAuthUser
}


export type TAuthRequest = {
    email: string,
    password: string
}

export type TOTPVerificationRequest = {
    otp: number
}

