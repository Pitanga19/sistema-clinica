import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'
import { booleanToString, handleOptionalProp } from '../../../../../shared/utils/functions'
import { TableFilterInputContainer, MainContainer, TableFilterFormContainer } from '../../../../../shared/components/Containers'
import { Title, Text, Error } from '../../../../../shared/components/Typography'
import { TableFilterTextInput, TableFilterSelect, Option } from '../../../../../shared/components/Inputs'
import { BaseButton, InLineButton, DeleteButton } from '../../../../../shared/components/Buttons'
import {
    Table,
    TableRow,
    TableHeader,
    TableHeaderCell,
    TableBody,
    TableCell,
} from '../../../../../shared/components/Tables'
import { ListItem } from '../../../../../shared/components/Lists'
import type { People, PeopleFilter } from '../../types'
import type { Entity } from '../../../entities/types'
import type { Plan } from '../../../plans/types'

interface PeopleListViewProps {
    filters: PeopleFilter
    people: People[]
    entities: Entity[]
    selectedEntity: Entity | null
    plans: Plan[]
    loading: boolean
    error: string | null
    onFiltersChange: (filters: PeopleFilter) => void
    onEntityChange: (entityId: string) => void
    onPlanChange: (planId: string) => void
    onCreate: () => void
    onView: (peopleId: number) => void
    onEdit: (peopleId: number) => void
    onDelete: (peopleId: number) => void
}

const PeopleListView = ({
    filters,
    people,
    entities,
    selectedEntity,
    plans,
    loading,
    error,
    onFiltersChange,
    onEntityChange,
    onPlanChange,
    onCreate,
    onView,
    onEdit,
    onDelete,
}: PeopleListViewProps) => {
    let content

    if (loading) {
        content = <Text>Cargando personas ...</Text>
    } else if (error) {
        content = <Error>{error}</Error>
    } else if (people.length === 0) {
        content = <Text>No hay personas para mostrar.</Text>
    } else {
        content = (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>DNI</TableHeaderCell>
                        <TableHeaderCell>Nombre</TableHeaderCell>
                        <TableHeaderCell>Apellido</TableHeaderCell>
                        <TableHeaderCell>Teléfono 1</TableHeaderCell>
                        <TableHeaderCell>Teléfono 2</TableHeaderCell>
                        <TableHeaderCell>Email</TableHeaderCell>
                        <TableHeaderCell>Dirección</TableHeaderCell>
                        <TableHeaderCell>Es paciente</TableHeaderCell>
                        <TableHeaderCell>Nro. HC</TableHeaderCell>
                        <TableHeaderCell>Obra social</TableHeaderCell>
                        <TableHeaderCell>Plan</TableHeaderCell>
                        <TableHeaderCell>Nro. Afiliado</TableHeaderCell>
                        <TableHeaderCell>Acciones</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {people.map((p) => (
                        <TableRow key={p.id}>
                            <TableCell>{p.dni}</TableCell>
                            <TableCell>{p.firstName}</TableCell>
                            <TableCell>{p.lastName}</TableCell>
                            <TableCell>{p.phone1}</TableCell>
                            <TableCell>{handleOptionalProp(p.phone2)}</TableCell>
                            <TableCell>{handleOptionalProp(p.email)}</TableCell>
                            <TableCell>{p.address}</TableCell>
                            <TableCell>{booleanToString(p.isPatient)}</TableCell>
                            <TableCell>{p.patient?.clinicalHistoryNumber ?? ''}</TableCell>
                            <TableCell>{p.patient?.plan?.entity?.name ?? ''}</TableCell>
                            <TableCell>{p.patient?.plan?.name ?? ''}</TableCell>
                            <TableCell>{p.patient?.entityCode ?? ''}</TableCell>
                            <TableCell>
                                <ListItem key={p.id}>
                                    <InLineButton onClick={() => onView(p.id)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </InLineButton>
                                    <InLineButton onClick={() => onEdit(p.id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </InLineButton>
                                    <DeleteButton onClick={() => onDelete(p.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </DeleteButton>
                                </ListItem>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    return (
        <MainContainer>
            <Title>Lista de Personas</Title>
            <BaseButton onClick={() => onCreate()}>
                Crear Persona <FontAwesomeIcon icon={faAdd} />
            </BaseButton>
            <TableFilterFormContainer>
                <TableFilterInputContainer>
                    <TableFilterTextInput
                        type='text'
                        id='dni'
                        name='dni'
                        placeholder='DNI'
                        value={filters.dni}
                        onChange={(e) => {
                            const value = e.target.value
                            onFiltersChange({ 
                                ...filters, 
                                dni: value === '' ? undefined : value
                            })
                        }}
                    />
                </TableFilterInputContainer>
                <TableFilterInputContainer>
                    <TableFilterTextInput
                        type='text'
                        id='firstName'
                        name='firstName'
                        placeholder='Nombre'
                        value={filters.firstName}
                        onChange={(e) => {
                            const value = e.target.value
                            onFiltersChange({ 
                                ...filters, 
                                firstName: value === '' ? undefined : value
                            })
                        }}
                    />
                </TableFilterInputContainer>
                <TableFilterInputContainer>
                    <TableFilterTextInput
                        type='text'
                        id='lastName'
                        name='lastName'
                        placeholder='Apellido'
                        value={filters.lastName}
                        onChange={(e) => {
                            const value = e.target.value
                            onFiltersChange({ 
                                ...filters, 
                                lastName: value === '' ? undefined : value
                            })
                        }}
                    />
                </TableFilterInputContainer>
                <TableFilterInputContainer>
                    <TableFilterSelect
                        id='isPatient'
                        value={filters.isPatient !== undefined ? filters.isPatient.toString() : ''}
                        onChange={(e) =>
                            onFiltersChange({
                                ...filters,
                                isPatient: e.target.value === '' ? undefined : e.target.value === 'true',
                                entityId: undefined,
                                planId: undefined,
                            })
                        }
                    >
                        <Option value=''>Todos</Option>
                        <Option value='true'>Es Paciente</Option>
                        <Option value='false'>No es Paciente</Option>
                    </TableFilterSelect>
                </TableFilterInputContainer>
                <TableFilterInputContainer>
                    <TableFilterSelect
                        id='entityId'
                        disabled={!filters.isPatient}
                        value={selectedEntity ? selectedEntity.id : ''}
                        onChange={(e) => onEntityChange(e.target.value)}
                    >
                        <Option value=''>Obra Social</Option>
                        {entities.map((entity) => (
                            <Option key={entity.id} value={entity.id}>
                                {entity.name}
                            </Option>
                        ))}
                    </TableFilterSelect>
                </TableFilterInputContainer>
                <TableFilterInputContainer>
                    <TableFilterSelect
                        id='planId'
                        disabled={!selectedEntity}
                        value={filters.planId ?? ''}
                        onChange={(e) => onPlanChange(e.target.value)}
                    >
                        <Option value=''>Plan</Option>
                        {plans.map((plan) => (
                            <Option key={plan.id} value={plan.id}>
                                {plan.name}
                            </Option>
                        ))}
                    </TableFilterSelect>
                </TableFilterInputContainer>
            </TableFilterFormContainer>
            {content}
        </MainContainer>
    )
}

export default PeopleListView
