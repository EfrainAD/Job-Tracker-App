import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '../components/layout/layout'

import Home from '../pages/home'
import Dashboard from '../pages/dashboard/dashboard'
import Login from '../pages/auth/login'
import ProtectedPage from './protectedPage'
import PageNotFound from '../pages/pageNotFound/PageNotFound'
import Header from '../components/header/header'
import EditJob from '../pages/job/editJob/EditJob'
import AddJob from '../pages/job/addJob/AddJob'
import JobDetail from '../pages/job/jobDetail/jobDetail'
import Profile from '../pages/profile/Profile'

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
            <Route
               path="/dashboard/add-job"
               element={
                  <ProtectedPage>
                     <Layout>
                        <AddJob />
                     </Layout>
                  </ProtectedPage>
               }
            />
            <Route
               path="/dashboard/job-detail/:id"
               element={
                  <ProtectedPage>
                     <Layout>
                        <JobDetail />
                     </Layout>
                  </ProtectedPage>
               }
            />

            {/* User Routes */}
            <Route
               path="/dashboard/profile"
               element={
                  <ProtectedPage>
                     <Layout>
                        <Profile />
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
