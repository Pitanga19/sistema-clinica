import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModeService } from '../../service'
import type { ModeCreate } from '../../types'
import ModesCreateView from './Create.view'

const ModesCreate = () => {
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const newModeData: ModeCreate = {
            name,
        }

        try {
            const newMode = await ModeService.create(newModeData)
            navigate(`/modes/detail/${newMode.id}`)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <ModesCreateView name={name} error={error} onNameChange={setName} onSubmit={handleSubmit} />
    )
}

export default ModesCreate
