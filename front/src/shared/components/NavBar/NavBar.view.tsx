import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faHome, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { StyledNavBar as NavBar } from '../../styles/NavBar.styles'

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
                <button onClick={onBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            )}
            <button title="Inicio" onClick={onHome}>
                <FontAwesomeIcon icon={faHome} /> Sistema Clínica
            </button>
            <button onClick={onToggleTheme}>
                <FontAwesomeIcon icon={currentTheme === 'dark' ? faMoon : faSun} />
            </button>
        </NavBar>
    )
}

export default NavBarView
