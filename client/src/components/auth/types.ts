export interface User {
    email: string,
    password: string,
    errors: object
}

export interface UserData {
    email: string,
    password: string,
    name?: string,
    password2?: string

}