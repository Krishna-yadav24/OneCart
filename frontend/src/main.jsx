import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import AuthContext from './context/AuthContext.jsx'
import UserContext from './context/UserContext.jsx'
import ShopContext from './context/ShopContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
  <AuthContext>
    <UserContext>
      <ShopContext>
        <App/>
      </ShopContext>   
    </UserContext>
  </AuthContext>
  </BrowserRouter>
  
)

