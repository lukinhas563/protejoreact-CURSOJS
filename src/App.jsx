import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { Provider } from "react-redux"

import store from "./store"
import GlobalStyled from "./styles/GlobalStyled"
import Header from './components/Header/index'

function App() {

  return (
    <Provider store={store}>
      <GlobalStyled />
      <Header />
      <Outlet />
      <ToastContainer autoClose={3000} className='toast-container' />
    </Provider>

  )
}

export default App
