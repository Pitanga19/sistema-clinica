import type { UserBase, UserBaseBackend, UserCreate, UserCreateBackend } from "./types"

export const userSnakeToCamel = (user: UserBaseBackend): UserBase => ({
    id: user.id,
    username: user.username,
    fullName: user.full_name,
    isActive: user.is_active,
    isSuperuser: user.is_superuser,
    roleId: user.role_id,
})

export const userCreateCamelToSnake = (user: UserCreate): UserCreateBackend => ({
    id: user.id,
    username: user.username,
    password: user.password,
    full_name: user.fullName,
    is_active: user.isActive,
    is_superuser: user.isSuperuser,
    role_id: user.roleId,
})