import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      
        <AppContextProvider>
          <App />
          <ToastContainer />
        </AppContextProvider>
    
    </BrowserRouter>
  </StrictMode>
)
