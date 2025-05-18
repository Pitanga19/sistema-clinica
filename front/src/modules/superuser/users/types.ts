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

export interface UserFormData {
    id: number
    username: string
    password: string
    fullName: string
    isActive: boolean
    isSuperuser: boolean
    roleId: number
}

export const userDefaultData: UserFormData = {
    id: 0,
    username: '',
    password: '',
    fullName: '',
    isActive: true,
    isSuperuser: false,
    roleId: 0,
}
