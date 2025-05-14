export interface UserBase {
    id: number
    username: string
    fullName: string
    isActive: boolean
    isSuperuser: boolean
    roleId: number
}

export type User = UserBase

export interface UserCreate extends UserBase {
    password: string
}

export type UserUpdate = Partial<UserCreate>

export interface UserBaseBackend {
    id: number
    username: string
    full_name: string
    is_active: boolean
    is_superuser: boolean
    role_id: number
}

export type UserBackend = UserBaseBackend

export interface UserCreateBackend extends UserBaseBackend {
    password: string
}

export type UserUpdateBackend = Partial<UserCreateBackend>
