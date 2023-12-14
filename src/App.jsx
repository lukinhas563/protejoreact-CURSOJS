import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'

import GlobalStyled from "./styles/GlobalStyled"
import Header from './components/Header/index'


function App() {

  return (
    <>
      <GlobalStyled />
      <Header />
      <Outlet />
      <ToastContainer autoClose={3000} className='toast-container' />
    </>

  )
}

export default App
