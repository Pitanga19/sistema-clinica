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
