import type { RoleBase } from "../roles/types"

export type RoleOut = RoleBase

export interface ProfessionalOut {
    signature: string
    nationalRegistration: string
    provincialRegistration: string
}

export interface ProfessionalCreate extends ProfessionalOut {
    userId?: number
}

export interface UserBase {
    file: string
    username: string
    fullName: string
    isActive: boolean
    isSuperuser: boolean
    isProfessional: boolean
    roleId: number
}

export interface Staff extends UserBase {
    id: number
    professional: Partial<ProfessionalOut>
    role: RoleOut
}

export interface StaffCreate extends UserBase {
    password: string
    professional?: Partial<ProfessionalCreate>
}

export type StaffUpdate = Partial<StaffCreate>

export interface StaffFilter {
    file?: string
    username?: string
    fullName?: string
    isActive?: boolean
    isProfessional?: boolean
    roleId?: number
}

export interface StaffFormData {
    file: string
    username: string
    password: string
    fullName: string
    isActive: boolean
    isSuperuser: boolean
    isProfessional: boolean
    roleId: number
    professional?: Partial<ProfessionalCreate>
}

export const staffDefaultData: StaffFormData = {
    file: '',
    username: '',
    password: '',
    fullName: '',
    isActive: true,
    isSuperuser: false,
    isProfessional: false,
    roleId: 0,
}
