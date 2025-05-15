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
    const navigate = useNavigate()
    const loadingMsg = 'Cargando modo ...'

    const handleEdit = (modeId: number) => navigate(`/modes/update/${modeId}`)

    const fetchMode = async () => {
        try {
            if (!id) {
                throw new Error('ID no proporcionado')
            }
            const response = await ModeService.getById(Number(id))
            setMode(response.data)
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
