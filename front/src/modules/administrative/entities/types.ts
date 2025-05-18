export interface EntityBase {
    name: string
}

export interface Entity extends EntityBase {
    id: number
}

export type EntityCreate = EntityBase

export type EntityUpdate = Partial<EntityBase>

export type EntityFormData = {
    name: string
}

export const entityDefaultData = {
    name: '',
}
