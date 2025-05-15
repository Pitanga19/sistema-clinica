export interface ModeBase {
    name: string
}

export interface Mode extends ModeBase {
    id: number
}

export type ModeCreate = ModeBase

export type ModeUpdate = ModeBase
