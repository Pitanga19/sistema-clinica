export interface ModeBase {
    name: string
}

export interface Mode extends ModeBase {
    id: number
}

export type ModeCreate = ModeBase

export type ModeUpdate = Partial<ModeBase>

export type ModeFormData = {
    name: string
}

export const modeDefaultData = {
    name: '',
}
