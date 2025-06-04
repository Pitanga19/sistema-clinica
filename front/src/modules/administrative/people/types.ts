interface EntityOut {
    id: number
    name: string
}

interface PlanOut {
    id: number
    name: string
    entityId: number
    entity: Partial<EntityOut>
}

interface PatientOut {
    id: number
    clinicalHistoryNumber: string
    entityCode: string
    planId: number
    plan: Partial<PlanOut>
}

export interface PeopleBase {
    dni: string
    firstName: string
    lastName: string
    phone1: string
    phone2: string | null
    email: string | null
    address: string
    isPatient:boolean
    patient: Partial<PatientOut>
}

export type People = PeopleBase & {
    id: number
}

export type PeopleCreate = PeopleBase

export type PeopleUpdate = Partial<PeopleCreate>

export type PeopleFormData = {
    dni: string
    firstName: string
    lastName: string
    phone1: string
    phone2: string | null
    email: string | null
    address: string
    isPatient:boolean
    patient: PatientOut
}

export const peopleDefaultData = {
    dni: '',
    firstName: '',
    lastName: '',
    phone1: '',
    phone2: null,
    email: null,
    address: '',
    isPatient: false,
    patient: {
        id: 0,
        clinicalHistoryNumber: '',
        entityCode: '',
        planId: 0,
        plan: {
            id: 0,
            name: '',
            entityId: 0,
            entity: {
                id: 0,
                name: '',
            },
        },
    },
}

export type PeopleFilter = {
    dni?: string
    firstName?: string
    lastName?: string
    isPatient?: boolean
    entityId?: number
    planId?: number
}
