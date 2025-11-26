import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthPage from './Components/loginpage.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthPage>
    </AuthPage>
  </StrictMode>,
)
