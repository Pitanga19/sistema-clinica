import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { handleOptionalProp } from '../../../../../shared/utils/functions'
import { MainContainer } from '../../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../../shared/components/Typography'
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
            <Title>Detalle de Persona</Title>
            <Subtitle>
                {loading ? loadingMsg : `${person.firstName} ${person.lastName}`}
                <BaseButton onClick={() => onEdit(person.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </BaseButton>
            </Subtitle>
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
            <Error>{error}</Error>
        </MainContainer>
    )
}

export default PersonsDetailView
