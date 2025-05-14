export interface RoleBase {
    name: string
}

export interface Role extends RoleBase {
    id: number
}

export type RoleCreate = RoleBase

export type RoleUpdate = RoleBase
