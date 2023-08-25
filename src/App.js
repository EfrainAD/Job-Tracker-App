import PageRouter from './router/pageRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
   return (
      <>
         <ToastContainer />
         <PageRouter />
      </>
   )
}

export default App
