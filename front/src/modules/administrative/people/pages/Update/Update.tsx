import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { handleUpdateData } from '../../../../../shared/utils/functions'
import { PeopleService } from '../../service'
import { peopleDefaultData } from '../../types'
import type { People, PeopleFormData } from '../../types'
import type { Entity } from '../../../entities/types'
import PeopleFormView from '../../components/PeopleForm.view'
import type { Plan } from '../../../plans/types'
import { EntityService } from '../../../entities/service'
import { PlanService } from '../../../plans/service'

const PeopleUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentPeople, setCurrentPeople] = useState<People | null>(null)
    const [data, setData] = useState<PeopleFormData>(peopleDefaultData)
    const [entities, setEntities] = useState<Entity[]>([])
    const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null)
    const [plans, setPlans] = useState<Plan[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchPeople = async () => {
        if (!id) {
            setError('ID no proporcionado')
            setLoading(false)
            return
        }
        try {
            setCurrentPeople(await PeopleService.getByPersonId(Number(id)))
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }
    
    const fetchEntities = async () => {
        try {
            setEntities(await EntityService.getAll())
        } catch (error) {
            setError(`${error}`)
        }
    }

    const handleDataChange = (newData: Partial<PeopleFormData>) => {
        setData((prevData) => ({ ...prevData, ...newData }))
    }
    
    const handleEntityChange = async (entityIdStr: string) => {
        const entityId = parseInt(entityIdStr)
        setSelectedEntity(await EntityService.getById(entityId))
        setPlans(await PlanService.getByEntityId(entityId))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!id || !currentPeople || !data) return

        const updateData = handleUpdateData(data, peopleDefaultData)

        try {
            await PeopleService.update(Number(id), updateData)
            navigate(`/people/detail/${id}`)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPeople()
        fetchEntities()
    }, [])

    return (
        <PeopleFormView
            currentPeople={currentPeople}
            data={data}
            entities={entities}
            selectedEntity={selectedEntity}
            plans={plans}
            loading={loading}
            error={error}
            onDataChange={handleDataChange}
            onEntityChange={handleEntityChange}
            onSubmit={handleSubmit}
        />
    )
}

export default PeopleUpdate
