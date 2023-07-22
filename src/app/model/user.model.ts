export interface User{
    sub: string;
    role: string;
    iss: string;
    iat: Date;
    exp: Date;
    name: string;
}