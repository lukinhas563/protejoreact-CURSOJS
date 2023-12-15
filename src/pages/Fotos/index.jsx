import propTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'

import { Title } from "./styled"
import GlobalStyled from "../../styles/GlobalStyled"
import { Container } from "../../styles/GlobalStyled"

export default function Fotos({ isClosed }) {

    const isLoggedIn = false

    if (isClosed && !isLoggedIn) {
        toast.error('Usuário não cadastrado')
        return (
            <Navigate to={'/register'} />
        )

    } else {

        return (
            <Container>
                <GlobalStyled />
                <Title>
                    Fotos
                </Title>
            </Container>
        )


    }

}

Fotos.propTypes = {
    isClosed: propTypes.bool
}