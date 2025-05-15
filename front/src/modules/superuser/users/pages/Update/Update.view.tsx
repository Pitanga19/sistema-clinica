import type { Role } from '../../../roles/types'
import type { UserBase, UserUpdate } from '../../types'

interface UsersUpdateViewProps {
    currentUser: UserBase | null
    updateData: UserUpdate | null
    roles: Role[]
    loading: boolean
    loadingMsg: string
    error: string | null
    onUpdateDataChange: (updateData: UserUpdate) => void
    onSubmit: (e: React.FormEvent) => void
}

const UsersUpdateView = ({
    currentUser,
    updateData,
    roles,
    loading,
    loadingMsg,
    error,
    onUpdateDataChange,
    onSubmit,
}: UsersUpdateViewProps) => {
    if (!currentUser) return

    return (
        <div className='main_container'>
            <h1>Editar Usuario</h1>
            <h2>{loading ? loadingMsg : currentUser.fullName}</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='id'>Legajo</label>
                    <input
                        type='number'
                        id='id'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                id: parseInt(e.target.value, 10),
                            })
                        }
                    />
                </div>
                <div>
                    <label htmlFor='username'>Usuario</label>
                    <input
                        type='text'
                        id='username'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                username: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <label htmlFor='password'>Contraseña</label>
                    <input
                        type='password'
                        id='password'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                password: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <label htmlFor='fullName'>Nombre Completo</label>
                    <input
                        type='text'
                        id='fullName'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                fullName: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <label htmlFor='isActive'>Es activo</label>
                    <input
                        type='checkbox'
                        id='isActive'
                        checked={updateData?.isActive ?? currentUser.isActive}
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                isActive: e.target.checked,
                            })
                        }
                    />
                </div>
                <div>
                    <label htmlFor='isSuperuser'>Es superusuario</label>
                    <input
                        type='checkbox'
                        id='isSuperuser'
                        checked={updateData?.isSuperuser ?? currentUser.isSuperuser}
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                isSuperuser: e.target.checked,
                            })
                        }
                    />
                </div>
                <div>
                    <label htmlFor='roleId'>Rol</label>
                    <select
                        id='roleId'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                roleId: parseInt(e.target.value, 10),
                            })
                        }
                    >
                        <option value=''>Seleccione un rol</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <p className='error'>{error}</p>}
                <button type='submit'>Guardar</button>
            </form>
        </div>
    )
}

export default UsersUpdateView
