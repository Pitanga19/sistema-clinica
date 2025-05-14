export interface RoleBase {
    name: string
}

export interface Role extends RoleBase {
    id: number
}

export interface RoleCreate extends RoleBase {}

export interface RoleUpdate extends RoleBase {}
