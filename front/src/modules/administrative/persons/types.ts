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

export type PersonFormData = {
    id: number
    firstName: string
    lastName: string
    phone1: string
    phone2: string | null
    email: string | null
    address: string
}

export const personDefaultData = {
    id: 0,
    firstName: '',
    lastName: '',
    phone1: '',
    phone2: null,
    email: null,
    address: '',
}
