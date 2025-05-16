import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../shared/components/Containers'
import { List, ListItem } from '../../../shared/components/Lists'
import { InLineButton } from '../../../shared/components/Buttons'

interface DashboardViewProps {
    goToRolesList: () => void
    goToUsersList: () => void
    goToPersonsList: () => void
    goToEntitiesList: () => void
}

const DashboardView = ({
    goToRolesList,
    goToUsersList,
    goToPersonsList,
    goToEntitiesList,
}: DashboardViewProps) => {
    return (
        <MainContainer>
            <h1>Sistema Clínica</h1>
            <List>
                <ListItem>
                    Gestión de roles
                    <InLineButton onClick={goToRolesList}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </InLineButton>
                </ListItem>
                <ListItem>
                    Gestión de usuarios
                    <InLineButton onClick={goToUsersList}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </InLineButton>
                </ListItem>
                <ListItem>
                    Gestión de personas
                    <InLineButton onClick={goToPersonsList}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </InLineButton>
                </ListItem>
                <ListItem>
                    Gestión de obras sociales
                    <InLineButton onClick={goToEntitiesList}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </InLineButton>
                </ListItem>
            </List>
        </MainContainer>
    )
}

export default DashboardView
