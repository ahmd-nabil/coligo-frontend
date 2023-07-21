export class SignupRequest {
    constructor(public firstName: string,
                public lastName: string,
                public email: string,
                public password: string) {}
}