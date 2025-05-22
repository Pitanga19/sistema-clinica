import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PeopleService } from '../../service'
import { EntityService } from '../../../entities/service'
import type { People, PeopleFilter } from '../../types'
import type { Entity } from '../../../entities/types'
import type { Plan } from '../../../plans/types'
import PeopleListView from './List.view'
import { PlanService } from '../../../plans/service'

const PeopleList = () => {
    const [filters, setFilters] = useState<PeopleFilter>({})
    const [people, setPeople] = useState<People[]>([])
    const [entities, setEntities] = useState<Entity[]>([])
    const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null)
    const [plans, setPlans] = useState<Plan[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleFiltersChange = (newFilters: PeopleFilter) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters,
        }))
    }

    const fetchPeople = async () => {
        try {
            setPeople(await PeopleService.getFiltered(filters))
        } catch (error) {
            setError(`${error}`)
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

    const fetchPlans = async () => {
        if (!selectedEntity) return

        try {
            setPlans(await PlanService.getByEntityId(selectedEntity.id))
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    const handleEntityChange = (entityIdStr: string) => {
        const entityId = parseInt(entityIdStr, 10)
        
        if (isNaN(entityId)) {
            setSelectedEntity(null)
            setPlans([])
            setFilters((prev) => ({
                ...prev,
                entityId: undefined,
                planId: undefined,
            }))
            return
        }

        const entity = entities.find((e) => e.id === entityId) || null
        setSelectedEntity(entity)
        setFilters((prev) => ({
            ...prev,
            entityId,
            planId: undefined,
        }))
    }

    const handlePlanChange = (planIdStr: string) => {
    const planId = parseInt(planIdStr, 10)

    setFilters((prev) => ({
        ...prev,
        planId: isNaN(planId) ? undefined : planId,
    }))
}

    const handleCreate = () => navigate('/people/create')

    const handleView = (peopleId: number) => navigate(`/people/detail/${peopleId}`)

    const handleEdit = (peopleId: number) => navigate(`/people/update/${peopleId}`)

    const handleDelete = async (peopleId: number) => {
        try {
            if (!confirm('Confirma que desea eliminar esta persona?')) return
            if (!confirm('Está seguro?')) return
            if (!confirm('Muy seguro?')) return
            await PeopleService.delete(peopleId)
        } catch (error) {
            setError(`${error}`)
        }
    }

    useEffect(() => {
        fetchEntities()
        setLoading(false)
    }, [])

    useEffect(() => {
        fetchPlans()
    }, [selectedEntity])

    useEffect(() => {
        if (Object.values(filters).every((value) => value === undefined)) return
        fetchPeople()
    }, [filters])

    return (
        <PeopleListView
            filters={filters}
            people={people}
            entities={entities}
            selectedEntity={selectedEntity}
            plans={plans}
            loading={loading}
            error={error}
            onFiltersChange={handleFiltersChange}
            onEntityChange={handleEntityChange}
            onPlanChange={handlePlanChange}
            onCreate={handleCreate}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    )
}

export default PeopleList
