import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { booleanToString } from '../../../../../shared/utils/functions'
import { ConditionalContainer, MainContainer } from '../../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../../shared/components/Typography'
import {
    List,
    DetailItem,
    DetailTitle,
    DetailDescription,
} from '../../../../../shared/components/Lists'
import { BaseButton } from '../../../../../shared/components/Buttons'
import type { Staff } from '../../types'

interface StaffDetailViewProps {
    staff: Staff | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onEdit: (staffId: number) => void
}

const StaffDetailView = ({ staff, loading, loadingMsg, error, onEdit }: StaffDetailViewProps) => {
    if (!staff) return

    return (
        <MainContainer>
            <Title>Detalle de Usuario</Title>
            <Subtitle>
                {loading ? loadingMsg : staff.fullName}
                <BaseButton onClick={() => onEdit(staff.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </BaseButton>
            </Subtitle>
            <List className='staff_detail'>
                <DetailItem>
                    <DetailTitle>Legajo</DetailTitle>
                    <DetailDescription>{staff.file}</DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Usuario</DetailTitle>
                    <DetailDescription>{staff.username}</DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Nombre Completo</DetailTitle>
                    <DetailDescription>{staff.fullName}</DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Es activo</DetailTitle>
                    <DetailDescription>{booleanToString(staff.isActive)}</DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Es superusuario</DetailTitle>
                    <DetailDescription>{booleanToString(staff.isSuperuser)}</DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Es profesional</DetailTitle>
                    <DetailDescription>{booleanToString(staff.isProfessional)}</DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Rol</DetailTitle>
                    <DetailDescription>{staff.role?.name}</DetailDescription>
                </DetailItem>
                <ConditionalContainer show={staff.isProfessional}>
                    <DetailItem>
                        <DetailTitle>Firma</DetailTitle>
                        <DetailDescription>{staff.professional?.signature}</DetailDescription>
                    </DetailItem>
                </ConditionalContainer>
                <ConditionalContainer show={staff.isProfessional}>
                    <DetailItem>
                        <DetailTitle>Matrícula Nacional</DetailTitle>
                        <DetailDescription>{staff.professional?.nationalRegistration}</DetailDescription>
                    </DetailItem>
                </ConditionalContainer>
                <ConditionalContainer show={staff.isProfessional}>
                    <DetailItem>
                        <DetailTitle>Matrícula Provincial</DetailTitle>
                        <DetailDescription>{staff.professional?.provincialRegistration}</DetailDescription>
                    </DetailItem>
                </ConditionalContainer>
            </List>
            <Error>{error}</Error>
        </MainContainer>
    )
}

export default StaffDetailView
