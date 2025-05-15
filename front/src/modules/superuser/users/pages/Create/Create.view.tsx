import type { UserCreate } from '../../types'
import type { Role } from '../../../roles/types'

interface UsersCreateViewProps {
    userData: UserCreate
    error: string | null
    roles: Role[]
    onUserDataChange: (data: UserCreate) => void
    onSubmit: (e: React.FormEvent) => void
}

const UsersCreateView = ({
    userData,
    error,
    roles,
    onUserDataChange,
    onSubmit,
}: UsersCreateViewProps) => {
    return (
        <div className='main_container'>
            <h1>Crear Usuario</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='id'>Legajo</label>
                    <input
                        type='number'
                        id='id'
                        value={userData.id === 0 ? '' : userData.id}
                        onChange={(e) =>
                            onUserDataChange({
                                ...userData,
                                id: parseInt(e.target.value, 10),
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor='username'>Usuario</label>
                    <input
                        type='text'
                        id='username'
                        value={userData.username}
                        onChange={(e) =>
                            onUserDataChange({
                                ...userData,
                                username: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Contraseña</label>
                    <input
                        type='password'
                        id='password'
                        value={userData.password}
                        onChange={(e) =>
                            onUserDataChange({
                                ...userData,
                                password: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor='fullName'>Nombre Completo</label>
                    <input
                        type='text'
                        id='fullName'
                        value={userData.fullName}
                        onChange={(e) =>
                            onUserDataChange({
                                ...userData,
                                fullName: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor='isActive'>Es activo</label>
                    <input
                        type='checkbox'
                        id='isActive'
                        checked={userData.isActive}
                        onChange={(e) =>
                            onUserDataChange({
                                ...userData,
                                isActive: e.target.checked,
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor='isSuperuser'>Es superusuario</label>
                    <input
                        type='checkbox'
                        id='isSuperuser'
                        checked={userData.isSuperuser}
                        onChange={(e) =>
                            onUserDataChange({
                                ...userData,
                                isSuperuser: e.target.checked,
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor='roleId'>Rol</label>
                    <select
                        id='roleId'
                        value={userData.roleId}
                        onChange={(e) =>
                            onUserDataChange({
                                ...userData,
                                roleId: parseInt(e.target.value, 10),
                            })
                        }
                        required
                    >
                        <option value=''>Seleccione un rol</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
                <p className='error'>{error}</p>
                <button type='submit'>Crear</button>
            </form>
        </div>
    )
}

export default UsersCreateView
