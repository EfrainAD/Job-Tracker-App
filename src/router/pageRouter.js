import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/auth/login'
import ProtectedPage from './ProtectedRoute'

const PageRouter = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route
               path="/"
               element={
                  <ProtectedPage>
                     <Home />
                  </ProtectedPage>
               }
            />
            <Route path="/login" element={<Login />} />
         </Routes>
      </BrowserRouter>
   )
}

export default PageRouter
