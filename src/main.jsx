import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LoadingProvider } from './contexts/loadingContext.jsx'
import { ThemeProvider } from './contexts/themeContext.jsx'
import { AuthContextProvider } from './contexts/authContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
    <LoadingProvider>
    <ThemeProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeProvider>
    </LoadingProvider>
    </AuthContextProvider>
)
