
export interface Reducer {
    user?:User
    test?: Test
    vysledekTestu?: VysledekTestu[]
    procentUspechuTestu:number
}

export interface User {
    id?: number
    email: string
    password?: string
    admin: boolean
    accessToken: string
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

export interface VysledekTestu {
    type: string,
    nazev: string,
    countRight: number,
    countWrong: number,
}