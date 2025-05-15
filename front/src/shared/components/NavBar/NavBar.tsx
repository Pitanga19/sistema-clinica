// components/NavBar/NavBar.tsx
import NavBarView from './NavBar.view'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useThemeContext } from '../../theme/ThemeContext'

const NavBar = () => {
    const { theme, toggleTheme } = useThemeContext()
    const [showBackButton, setShowBackButton] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    const handleHome = () => navigate('/')
    const handleBack = () => navigate(-1)

    useEffect(() => {
        setShowBackButton(location.pathname !== '/' && location.pathname !== '/login')
    }, [location.pathname])

    return (
        <NavBarView
            showBackButton={showBackButton}
            currentTheme={theme}
            onHome={handleHome}
            onBack={handleBack}
            onToggleTheme={toggleTheme}
        />
    )
}

export default NavBar
