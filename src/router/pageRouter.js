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
import EditProfile from '../pages/profile/EditProfile'
import Register from '../pages/auth/Register'
import AddRecruiter from '../pages/recruiter/addRecruiter/AddRecruiter'
import RecruiterDashboard from '../pages/dashboard/RecruiterDashboard'
import RecruiterDetail from '../pages/recruiter/recruiterDetail/RecruiterDetail'
import EditRecruiter from '../pages/recruiter/editRecruiter/editRecruiter'
import Coach from '../pages/coach/Coach'
import JobBoard from '../pages/jobBoard/JobBoard'
import Contact from '../pages/contact/Contact'

const PageRouter = () => {
   return (
      <BrowserRouter>
         <Routes>
            {/* Login */}
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

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
            <Route
               path="/dashboard/recruiter"
               element={
                  <ProtectedPage>
                     <Layout>
                        <RecruiterDashboard />
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

            {/* Recruiter Routes */}
            <Route
               path="/dashboard/edit-recruiter/:id"
               element={
                  <ProtectedPage>
                     <Layout>
                        <EditRecruiter />
                     </Layout>
                  </ProtectedPage>
               }
            />
            <Route
               path="/dashboard/add-recruiter"
               element={
                  <ProtectedPage>
                     <Layout>
                        <AddRecruiter />
                     </Layout>
                  </ProtectedPage>
               }
            />
            <Route
               path="/dashboard/recruiter-detail/:id"
               element={
                  <ProtectedPage>
                     <Layout>
                        <RecruiterDetail />
                     </Layout>
                  </ProtectedPage>
               }
            />

            {/* Coach Routes */}
            <Route
               path="/dashboard/coach"
               element={
                  <ProtectedPage>
                     <Layout>
                        <Coach />
                     </Layout>
                  </ProtectedPage>
               }
            />

            {/* Job Boards Routes */}
            <Route
               path="/dashboard/jobboard"
               element={
                  <ProtectedPage>
                     <Layout>
                        <JobBoard />
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
            <Route
               path="/dashboard/profile-update"
               element={
                  <ProtectedPage>
                     <Layout>
                        <EditProfile />
                     </Layout>
                  </ProtectedPage>
               }
            />

            {/* Contact Page */}
            <Route
               path="/dashboard/contact-us"
               element={
                  <ProtectedPage>
                     <Layout>
                        <Contact />
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
