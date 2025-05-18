import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { handleOptionalProp } from '../../../../../shared/utils/functions'
import { MainContainer } from '../../../../../shared/components/Containers'
import {
    List,
    DetailItem,
    DetailTitle,
    DetailDescription,
} from '../../../../../shared/components/Lists'
import { BaseButton } from '../../../../../shared/components/Buttons'
import type { Person } from '../../types'

interface PersonsDetailViewProps {
    person: Person | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onEdit: (personId: number) => void
}

const PersonsDetailView = ({
    person,
    loading,
    loadingMsg,
    error,
    onEdit,
}: PersonsDetailViewProps) => {
    if (!person) return

    return (
        <MainContainer>
            <h1>Detalle de Persona</h1>
            <h2>{loading ? loadingMsg : `${person.firstName} ${person.lastName}`}</h2>
            <BaseButton onClick={() => onEdit(person.id)}>
                <FontAwesomeIcon icon={faEdit} />
            </BaseButton>
            <List>
                <DetailItem>
                    <DetailTitle>DNI</DetailTitle>
                    <DetailDescription>{person.id}</DetailDescription>
                </DetailItem>

                <DetailItem>
                    <DetailTitle>Nombre</DetailTitle>
                    <DetailDescription>{person.firstName}</DetailDescription>
                </DetailItem>

                <DetailItem>
                    <DetailTitle>Apellido</DetailTitle>
                    <DetailDescription>{person.lastName}</DetailDescription>
                </DetailItem>

                <DetailItem>
                    <DetailTitle>Teléfono 1</DetailTitle>
                    <DetailDescription>{person.phone1}</DetailDescription>
                </DetailItem>

                <DetailItem>
                    <DetailTitle>Teléfono 2</DetailTitle>
                    <DetailDescription>{handleOptionalProp(person.phone2)}</DetailDescription>
                </DetailItem>

                <DetailItem>
                    <DetailTitle>E-mail</DetailTitle>
                    <DetailDescription>{handleOptionalProp(person.email)}</DetailDescription>
                </DetailItem>

                <DetailItem>
                    <DetailTitle>Dirección</DetailTitle>
                    <DetailDescription>{person.address}</DetailDescription>
                </DetailItem>
            </List>
            {error && <p className='error'>{error}</p>}
        </MainContainer>
    )
}

export default PersonsDetailView
