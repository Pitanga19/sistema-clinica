import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { booleanToString, handleOptionalProp } from '../../../../../shared/utils/functions'
import { ConditionalContainer, MainContainer } from '../../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../../shared/components/Typography'
import {
    List,
    DetailItem,
    DetailTitle,
    DetailDescription,
} from '../../../../../shared/components/Lists'
import { BaseButton } from '../../../../../shared/components/Buttons'
import type { People } from '../../types'

interface PeopleDetailViewProps {
    people: People | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onEdit: (peopleId: number) => void
}

const PeopleDetailView = ({
    people,
    loading,
    loadingMsg,
    error,
    onEdit,
}: PeopleDetailViewProps) => {
    if (!people) return

    return (
        <MainContainer>
            <Title>Detalle de Persona</Title>
            <Subtitle>
                {loading ? loadingMsg : `${people.firstName} ${people.lastName}`}
                <BaseButton onClick={() => onEdit(people.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </BaseButton>
            </Subtitle>
            <List>
                <DetailItem>
                    <DetailTitle>DNI</DetailTitle>
                    <DetailDescription>{people.dni}</DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Nombre</DetailTitle>
                    <DetailDescription>{people.firstName}</DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Apellido</DetailTitle>
                    <DetailDescription>{people.lastName}</DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Teléfono 1</DetailTitle>
                    <DetailDescription>{people.phone1}</DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Teléfono 2</DetailTitle>
                    <DetailDescription>{handleOptionalProp(people.phone2)}</DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>E-mail</DetailTitle>
                    <DetailDescription>{handleOptionalProp(people.email)}</DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Dirección</DetailTitle>
                    <DetailDescription>{people.address}</DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Es paciente</DetailTitle>
                    <DetailDescription>{booleanToString(people.isPatient)}</DetailDescription>
                </DetailItem>
                <ConditionalContainer show={people.isPatient}>
                    <DetailItem>
                        <DetailTitle>Número de HC</DetailTitle>
                        <DetailDescription>{people.patient?.clinicalHistoryNumber}</DetailDescription>
                    </DetailItem>
                </ConditionalContainer>
                <ConditionalContainer show={people.isPatient}>
                    <DetailItem>
                        <DetailTitle>Obra Social</DetailTitle>
                        <DetailDescription>{people.patient?.plan?.entity?.name}</DetailDescription>
                    </DetailItem>
                </ConditionalContainer>
                <ConditionalContainer show={people.isPatient}>
                    <DetailItem>
                        <DetailTitle>Plan</DetailTitle>
                        <DetailDescription>{people.patient?.plan?.name}</DetailDescription>
                    </DetailItem>
                </ConditionalContainer>
                <ConditionalContainer show={people.isPatient}>
                    <DetailItem>
                        <DetailTitle>Número de afiliado</DetailTitle>
                        <DetailDescription>{people.patient?.entityCode}</DetailDescription>
                    </DetailItem>
                </ConditionalContainer>
            </List>
            <Error>{error}</Error>
        </MainContainer>
    )
}

export default PeopleDetailView
