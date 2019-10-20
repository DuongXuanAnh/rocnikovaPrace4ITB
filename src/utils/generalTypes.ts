export interface Reducer {
    user?:User
}

export interface User {
    id: number
    email: string
    password: string
}