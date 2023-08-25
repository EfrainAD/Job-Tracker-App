import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '../components/layout/layout'

import Home from '../pages/home'

import Login from '../pages/auth/login'
import ProtectedPage from './protectedPage'

const PageRouter = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route
               path="/"
               element={
                  <ProtectedPage>
                     <Layout>
                        <Home />
                     </Layout>
                  </ProtectedPage>
               }
            />
         </Routes>
      </BrowserRouter>
   )
}

export default PageRouter
