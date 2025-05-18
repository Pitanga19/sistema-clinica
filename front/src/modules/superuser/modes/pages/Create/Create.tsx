import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModeService } from '../../service'
import { modeDefaultData } from '../../types'
import type { ModeFormData } from '../../types'
import ModeFormView from '../../components/ModeForm.view'

const ModesCreate = () => {
    const [data, setData] = useState<ModeFormData>(modeDefaultData)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleDataChange = (newData: Partial<ModeFormData>) => {
        setData((prev) => ({ ...prev, ...newData }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const newMode = await ModeService.create(data)
            navigate(`/modes/detail/${newMode.id}`)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <ModeFormView
            currentMode={null}
            data={data}
            loading={false}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default ModesCreate
