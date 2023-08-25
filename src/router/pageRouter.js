import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/auth/login'

const PageRouter = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
         </Routes>
      </BrowserRouter>
   )
}

export default PageRouter
