export type RegisterData = {
    username: string
    password: string
    confirm_password: string
}

export type RegisterUserAction = {
    username: string;
    password: string;
}

export type LoginData = {
    username: string;
    password: string;
}