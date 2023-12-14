import { Outlet } from "react-router-dom"

import GlobalStyled from "./styles/GlobalStyled"
import Header from './components/Header/index'


function App() {

  return (
    <>
      <GlobalStyled />
      <Header />
      <Outlet />
    </>

  )
}

export default App
