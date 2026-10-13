import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import { AuthProvider } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';



createRoot(document.getElementById('root')).render(
 <StrictMode>
   <BrowserRouter>
   <AuthProvider>
    <ProductsProvider>
     <App />
     </ProductsProvider>
     </AuthProvider>
   </BrowserRouter>
 </StrictMode>,
)

