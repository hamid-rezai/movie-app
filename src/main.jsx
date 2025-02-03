import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LoadingProvider } from './contexts/loadingContext.jsx'
import { ThemeProvider } from './contexts/themeContext.jsx'

createRoot(document.getElementById('root')).render(
    <LoadingProvider>
    <ThemeProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeProvider>
    </LoadingProvider>
)
