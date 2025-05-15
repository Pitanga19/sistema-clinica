import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ModeService } from '../../service'
import type { Mode, ModeUpdate } from '../../types'
import ModesUpdateView from './Update.view'

const ModesUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentMode, setCurrentMode] = useState<Mode | null>(null)
    const [updateData, setUpdateData] = useState<ModeUpdate | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando modo ...'
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMode = async () => {
            try {
                if (!id) {
                    throw new Error('ID no proporcionado')
                }
                setCurrentMode(await ModeService.getById(Number(id)))
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


        if (!id || !currentMode || !updateData) return

        try {
            await ModeService.update(Number(id), updateData)
            navigate(`/modes/detail/${id}`)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ModesUpdateView
            currentMode={currentMode}
            updateData={updateData}
            loading={loading}
            loadingMsg={loadingMsg}
            error={error}
            onUpdateDataChange={setUpdateData}
            onSubmit={handleSubmit}
        />
    )
}

export default ModesUpdate
