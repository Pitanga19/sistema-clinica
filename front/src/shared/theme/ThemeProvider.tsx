import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from './themes'
import GlobalStyle from './GlobalStyle'
import { ThemeProvider as ThemeContextProvider, useThemeContext } from './ThemeContext'

const InternalThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useThemeContext()
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme

    return (
        <StyledThemeProvider theme={currentTheme}>
            <GlobalStyle />
            {children}
        </StyledThemeProvider>
    )
}

const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
    <ThemeContextProvider>
        <InternalThemeWrapper>{children}</InternalThemeWrapper>
    </ThemeContextProvider>
)

export default ThemeProvider
