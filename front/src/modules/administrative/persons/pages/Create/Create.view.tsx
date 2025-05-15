import type { PersonCreate } from '../../types'

interface PersonsCreateViewProps {
    personData: PersonCreate
    error: string | null
    onPersonDataChange: (data: PersonCreate) => void
    onSubmit: (e: React.FormEvent) => void
}

const PersonsCreateView = ({
    personData,
    error,
    onPersonDataChange,
    onSubmit,
}: PersonsCreateViewProps) => {
    return (
        <div className='main_container'>
            <h1>Crear Usuario</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='id'>DNI</label>
                    <input
                        type='number'
                        id='id'
                        onChange={(e) =>
                            onPersonDataChange({
                                ...personData,
                                id: parseInt(e.target.value, 10),
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor='firstName'>Nombre</label>
                    <input
                        type='text'
                        id='firstName'
                        onChange={(e) =>
                            onPersonDataChange({
                                ...personData,
                                firstName: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor='lastName'>Apellido</label>
                    <input
                        type='text'
                        id='lastName'
                        onChange={(e) =>
                            onPersonDataChange({
                                ...personData,
                                lastName: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor='phone1'>Teléfono 1</label>
                    <input
                        type='phone'
                        id='phone1'
                        onChange={(e) =>
                            onPersonDataChange({
                                ...personData,
                                phone1: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor='phone2'>Teléfono 2</label>
                    <input
                        type='phone'
                        id='phone2'
                        onChange={(e) =>
                            onPersonDataChange({
                                ...personData,
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
                            onPersonDataChange({
                                ...personData,
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
                            onPersonDataChange({
                                ...personData,
                                address: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <p className='error'>{error}</p>
                <button type='submit'>Crear</button>
            </form>
        </div>
    )
}

export default PersonsCreateView
