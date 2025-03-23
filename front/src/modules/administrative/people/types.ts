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
    id: number | null
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

export const peopleDefaultData: PeopleFormData = {
    id: null,
    dni: 'to modify',
    firstName: 'to modify',
    lastName: 'to modify',
    phone1: 'to modify',
    phone2: null,
    email: null,
    address: 'to modify',
    isPatient: false,
    patient: {},
}

export type PeopleFilter = {
    dni?: string
    firstName?: string
    lastName?: string
    isPatient?: boolean
    entityId?: number
    planId?: number
}
