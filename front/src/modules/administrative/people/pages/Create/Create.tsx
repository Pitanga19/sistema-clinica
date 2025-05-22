import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PeopleService } from '../../service'
import { EntityService } from '../../../entities/service'
import { PlanService } from '../../../plans/service'
import { peopleDefaultData } from '../../types'
import type { PeopleFormData } from '../../types'
import type { Entity } from '../../../entities/types'
import type { Plan } from '../../../plans/types'
import PeopleFormView from '../../components/PeopleForm.view'

const PeopleCreate = () => {
    const [data, setData] = useState<PeopleFormData>(peopleDefaultData)
    const [entities, setEntities] = useState<Entity[]>([])
    const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null)
    const [plans, setPlans] = useState<Plan[]>([])
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

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
        setError(null)
        console.log('data', data)

        try {
            const newPeople = await PeopleService.create(data)
            navigate(`/people/detail/${newPeople.id}`)
        } catch (error) {
            setError(`${error}`)
        }
    }

    useEffect(() => {
        fetchEntities()
    }, [])

    return (
        <PeopleFormView
            currentPeople={null}
            data={data}
            entities={entities}
            selectedEntity={selectedEntity}
            plans={plans}
            loading={false}
            error={error}
            onDataChange={handleDataChange}
            onEntityChange={handleEntityChange}
            onSubmit={handleSubmit}
        />
    )
}

export default PeopleCreate
