import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'

import store, { persistor } from "./store/index"
import GlobalStyled from "./styles/GlobalStyled"
import Header from './components/Header/index'

function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyled />
        <Header />
        <Outlet />
        <ToastContainer autoClose={3000} className='toast-container' />
      </PersistGate>
    </Provider>
  )
}

export default App
