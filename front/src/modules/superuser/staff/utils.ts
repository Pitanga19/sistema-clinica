import { staffDefaultData } from './types'
import type { StaffFormData } from './types'

export const handleStaffCreateData = (data: StaffFormData): StaffFormData => ({
    file: data.file,
    username: data.username,
    password: data.password,
    fullName: data.fullName,
    isActive: data.isActive,
    isSuperuser: data.isSuperuser,
    isProfessional: data.isProfessional,
    roleId: data.roleId,
    professional: data.isProfessional ? data.professional : undefined,
})

export const handleStaffUpdateData = (data: StaffFormData): Partial<StaffFormData> => {
    const defaultData = staffDefaultData
    const toSendData: Partial<StaffFormData> = {
        isActive: data.isActive,
        isSuperuser: data.isSuperuser,
        isProfessional: data.isProfessional,
    }

    if (data.file !== defaultData.file) toSendData.file = data.file
    if (data.username !== defaultData.username) toSendData.username = data.username
    if (data.password !== defaultData.password) toSendData.password = data.password
    if (data.fullName !== defaultData.fullName) toSendData.fullName = data.fullName
    if (data.roleId !== defaultData.roleId) toSendData.roleId = data.roleId
    if (data.professional) toSendData.professional = data.professional

    return toSendData
}
