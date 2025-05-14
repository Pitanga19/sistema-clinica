import { useState, useEffect } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from './themes'
import GlobalStyle from './GlobalStyle'

type Props = {
    children: React.ReactNode
}

const ThemeProvider = ({ children }: Props) => {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark')
    
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
        if (savedTheme) setTheme(savedTheme)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    const currentTheme = theme === 'dark' ? darkTheme : lightTheme

    return (
        <StyledThemeProvider theme={currentTheme}>
            <GlobalStyle />
            <button onClick={toggleTheme}>Cambiar Tema</button>
            {children}
        </StyledThemeProvider>
    )
}

export default ThemeProvider
