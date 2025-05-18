import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ModeService } from '../../service'
import { modeDefaultData } from '../../types'
import type { Mode, ModeFormData } from '../../types'
import ModeFormView from '../../components/ModeForm.view'

const ModesUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentMode, setCurrentMode] = useState<Mode | null>(null)
    const [data, setData] = useState<ModeFormData>(modeDefaultData)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    const fetchMode = async () => {
        try {
            if (!id) {
                setError('ID no proporcionado')
                return
            }
            setCurrentMode(await ModeService.getById(Number(id)))
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    const handleDataChange = (newData: Partial<ModeFormData>) => {
        setData((prev) => ({ ...prev, ...newData }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!id || !currentMode || !data) return

        try {
            await ModeService.update(Number(id), data)
            navigate(`/modes/detail/${id}`)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchMode()
        }
        fetchData()
    }, [])

    return (
        <ModeFormView
            currentMode={currentMode}
            data={data}
            loading={loading}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default ModesUpdate
