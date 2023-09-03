import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '../components/layout/layout'

import Home from '../pages/home'
import Dashboard from '../pages/dashboard/dashboard'
import Login from '../pages/auth/login'
import ProtectedPage from './protectedPage'
import PageNotFound from '../pages/pageNotFound/PageNotFound'
import Header from '../components/header/header'
import EditJob from '../pages/job/editJob/EditJob'

const PageRouter = () => {
   return (
      <BrowserRouter>
         <Routes>
            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Test Home that need be removed */}
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

            {/* Dashboard */}
            <Route
               path="/dashboard"
               element={
                  <ProtectedPage>
                     <Layout>
                        <Dashboard />
                     </Layout>
                  </ProtectedPage>
               }
            />

            {/* Job Routes */}
            <Route
               path="/dashboard/edit-job/:id"
               element={
                  <ProtectedPage>
                     <Layout>
                        <EditJob />
                     </Layout>
                  </ProtectedPage>
               }
            />

            {/* Page Not Found */}
            <Route
               path="/*"
               element={
                  <>
                     <Header />
                     <PageNotFound />
                  </>
               }
            />
         </Routes>
      </BrowserRouter>
   )
}

export default PageRouter
