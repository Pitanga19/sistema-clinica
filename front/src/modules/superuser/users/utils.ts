import { userDefaultData, type UserFormData } from './types'

export const getToSendUserData = (data: UserFormData): Partial<UserFormData> => {
    const defaultData = userDefaultData
    const toSendData: Partial<UserFormData> = {
        id: undefined,
        username: undefined,
        password: undefined,
        fullName: undefined,
        isActive: undefined,
        isSuperuser: undefined,
        roleId: undefined,
    }

    if (data.id !== defaultData.id) toSendData.id = data.id
    if (data.username !== defaultData.username) toSendData.username = data.username
    if (data.password !== defaultData.password) toSendData.password = data.password
    if (data.fullName !== defaultData.fullName) toSendData.fullName = data.fullName
    if (data.roleId !== defaultData.roleId) toSendData.roleId = data.roleId

    toSendData.isActive = data.isActive
    toSendData.isSuperuser = data.isSuperuser

    return toSendData
}
