

export interface Reducer {
    user?:User
    test?: Test
}

export interface User {
    id: number
    email: string
    password: string
    admin: boolean
}

export interface Test {
    countQuestions: number
    testSZ?: boolean
    testIY?: boolean
    testU?: boolean
    testVyj?: boolean
    testBEBJE?: boolean
    question?: string
    napoveda?: string
    rightAnswer?: string
}

export interface Honoceni {
    
}