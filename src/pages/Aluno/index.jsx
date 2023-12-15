import propTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'

import { Title } from "./styled"
import GlobalStyled from "../../styles/GlobalStyled"
import { Container } from "../../styles/GlobalStyled"

export default function Aluno({ isClosed }) {

    const isLoggedIn = false
    console.log(isClosed)

    if (isClosed && !isLoggedIn) {
        toast.error('Eita porra')
        return (
            <Navigate to={'/register'} />
        )

    } else {

        return (
            <Container>
                <GlobalStyled />
                <Title>
                    Aluno
                </Title>
            </Container>
        )


    }

}

Aluno.propTypes = {
    isClosed: propTypes.bool
}