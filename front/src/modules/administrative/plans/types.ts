export interface PlanBase {
    name: string
    entityId: number
}

export interface Plan extends PlanBase {
    id: number
}

export type PlanCreate = PlanBase

export type PlanUpdate = Partial<PlanBase>
