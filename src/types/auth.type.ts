export type TAuthUser = {
    _id: string,
    first_name: string,
    last_name?: string | null,
    email: string
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

