import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import TestPage from './pages/testPage'

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<TestPage />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
