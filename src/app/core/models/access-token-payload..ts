export interface AccessTokenPayload {
    nameid: string;
    sub: string;
    role: string[] | null;
    nbf: number;
    exp: number;
    iss: string;
    aud: string;
}
