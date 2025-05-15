import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ModeService } from '../../service'
import type { ModeUpdate } from '../../types'
import ModesUpdateView from './Update.view'

const ModesUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [name, setName] = useState<string>('')
    const [currentName, setCurrentName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const loadingMsg = 'Cargando ...'

    useEffect(() => {
        const fetchMode = async () => {
            try {
                if (!id) {
                    throw new Error('ID no proporcionado')
                }
                const response = await ModeService.getById(Number(id))
                setName(response.data.name)
                setCurrentName(response.data.name)
            } catch (error) {
                setError(`${error}`)
            } finally {
                setLoading(false)
            }
        }

        fetchMode()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const updateModeData: ModeUpdate = {
            name,
        }

        try {
            if (!id) {
                throw new Error('ID no proporcionado')
            }
            await ModeService.update(Number(id), updateModeData)
            navigate(`/modes/detail/${id}`)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ModesUpdateView
            name={name}
            currentName={currentName}
            loading={loading}
            loadingMsg={loadingMsg}
            error={error}
            onChangeName={setName}
            onSubmit={handleSubmit}
        />
    )
}

export default ModesUpdate
