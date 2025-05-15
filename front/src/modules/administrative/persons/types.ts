export interface PersonBase {
    id: number
    firstName: string
    lastName: string
    phone1: string
    phone2: string | null
    email: string | null
    address: string
}

export type Person = PersonBase

export type PersonCreate = PersonBase

export type PersonUpdate = Partial<PersonCreate>
