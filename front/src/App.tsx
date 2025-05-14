import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/AppRoutes'
import ThemeProvider from './shared/theme/ThemeProvider'

const App = () => {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
