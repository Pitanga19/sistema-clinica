import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ModeService } from '../../service'
import ModesDetailView from './Detail.view'
import type { Mode } from '../../types'

const ModesDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [mode, setMode] = useState<Mode | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando modo ...'
    const navigate = useNavigate()

    const handleEdit = (modeId: number) => navigate(`/modes/update/${modeId}`)

    const fetchMode = async () => {
        try {
            if (!id) {
                throw new Error('ID no proporcionado')
            }
            setMode(await ModeService.getById(Number(id)))
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMode()
    }, [])

    return <ModesDetailView
        mode={mode}
        loading={loading}
        loadingMsg={loadingMsg}
        error={error}
        onEdit={handleEdit}
    />
}

export default ModesDetail
