import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModeService } from '../../service'
import type { Mode } from '../../types'
import ModesListView from './List.view'

const ModesList = () => {
    const [modes, setModes] = useState<Mode[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchModes = async () => {
        try {
            setModes(await ModeService.getAll())
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchModes()
    }, [])

    const handleCreate = () => navigate('/modes/create')

    const handleView = (modeId: number) => navigate(`/modes/detail/${modeId}`)

    const handleEdit = (modeId: number) => navigate(`/modes/update/${modeId}`)

    const handleDelete = async (modeId: number) => {
        try {
            if (!confirm('Confirma que desea eliminar este modo?')) return
            if (!confirm('Está seguro?')) return
            if (!confirm('Muy seguro?')) return
            await ModeService.delete(modeId)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <ModesListView
            modes={modes}
            loading={loading}
            error={error}
            onCreate={handleCreate}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    )
}

export default ModesList
