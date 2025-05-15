import type { PersonBase, PersonUpdate } from '../../types'

interface PersonsUpdateViewProps {
    currentPerson: PersonBase | null
    updateData: PersonUpdate | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onUpdateDataChange: (updateData: PersonUpdate) => void
    onSubmit: (e: React.FormEvent) => void
}

const PersonsUpdateView = ({
    currentPerson,
    updateData,
    loading,
    loadingMsg,
    error,
    onUpdateDataChange,
    onSubmit,
}: PersonsUpdateViewProps) => {
    if (!currentPerson) return

    return (
        <div className='main_container'>
            <h1>Editar Usuario</h1>
            <h2>{loading ? loadingMsg : (`${currentPerson.firstName} ${currentPerson.lastName}`)}</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='id'>DNI</label>
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
                    <label htmlFor='firstName'>Nombre</label>
                    <input
                        type='text'
                        id='firstName'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                firstName: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <label htmlFor='lastName'>Apellido</label>
                    <input
                        type='text'
                        id='lastName'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                lastName: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <label htmlFor='phone1'>Teléfono 1</label>
                    <input
                        type='phone'
                        id='phone1'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                phone1: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <label htmlFor='phone2'>Teléfono 2</label>
                    <input
                        type='phone'
                        id='phone2'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                phone2: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        type='email'
                        id='email'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                email: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <label htmlFor='address'>Dirección</label>
                    <input
                        type='text'
                        id='address'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                address: e.target.value,
                            })
                        }
                    />
                </div>
                <p className='error'>{error}</p>
                <button type='submit'>Crear</button>
            </form>
        </div>
    )
}

export default PersonsUpdateView
