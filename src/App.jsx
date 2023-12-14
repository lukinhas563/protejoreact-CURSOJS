import { Link } from "react-router-dom"

import GlobalStyled from "./styles/GlobalStyled"
import { Container } from "./styles/GlobalStyled"

function App() {

  return (
    <Container>
      <GlobalStyled />
      <h1>Hello World!</h1>
      <ul>
        <li>
          <Link to={'/login'}>Login</Link>
        </li>
      </ul>
    </Container>
  )
}

export default App
