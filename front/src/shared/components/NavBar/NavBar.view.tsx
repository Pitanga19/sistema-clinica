import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faHome, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { StyledNavBar as NavBar } from '../../styles/NavBar.styles'
import { NavBarButton } from '../Buttons'

type Props = {
    currentTheme: 'dark' | 'light'
    showBackButton: boolean
    onToggleTheme: () => void
    onBack: () => void
    onHome: () => void
}

const NavBarView = ({ onToggleTheme, currentTheme, onBack, showBackButton, onHome }: Props) => {
    return (
        <NavBar>
            {showBackButton && (
                <NavBarButton onClick={onBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </NavBarButton>
            )}
            <NavBarButton title='Inicio' onClick={onHome}>
                <FontAwesomeIcon icon={faHome} /> Sistema Clínica
            </NavBarButton>
            <NavBarButton onClick={onToggleTheme}>
                <FontAwesomeIcon icon={currentTheme === 'dark' ? faMoon : faSun} />
            </NavBarButton>
        </NavBar>
    )
}

export default NavBarView
