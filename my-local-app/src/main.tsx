import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
// import  { App2, ShoppingCart, App } from './App.tsx'
import './styles/SCSSandTailwind.scss'
// import { RegisterPage } from './views/auth/registerPage'
// import { LoginPage } from './views/auth/loginPage'
import {  App3 } from './App'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App3/>
      
     
  </StrictMode>,
)
