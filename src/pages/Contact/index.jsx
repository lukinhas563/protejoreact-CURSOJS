import { Navigate } from 'react-router-dom'
import propTypes from 'prop-types'

import GlobalStyled from "../../styles/GlobalStyled"
import { Container } from "../../styles/GlobalStyled"
import { toast } from 'react-toastify'

export default function Contato({ isClosed }) {

    const isLoggedIn = false

    if (isClosed && !isLoggedIn) {
        toast.error('Eita porra')
        return (
            <Navigate to={'/login'} />
        )

    } else {

        return (
            <Container>
                <GlobalStyled />
                <h1>Página Contatos</h1>
            </Container>
        )

    }

}

Contato.propTypes = {
    isClosed: propTypes.bool
}
