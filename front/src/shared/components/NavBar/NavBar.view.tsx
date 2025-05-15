import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faHome, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { Container } from './NavBar.styles'

type Props = {
    currentTheme: 'dark' | 'light'
    showBackButton: boolean
    onToggleTheme: () => void
    onBack: () => void
    onHome: () => void
}

const NavBarView = ({ onToggleTheme, currentTheme, onBack, showBackButton, onHome }: Props) => {
    return (
        <Container>
            <div>
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
            </div>
        </Container>
    )
}

export default NavBarView
