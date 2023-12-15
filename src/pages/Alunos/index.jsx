// CONDIÇÃO
import propTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

import { Title } from "./styled"
import GlobalStyled from "../../styles/GlobalStyled"
import { Container } from "../../styles/GlobalStyled"

export default function Alunos({ isClosed }) {

    const isLoggedIn = false


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
                    Lista de Alunos
                </Title>
                <ul>
                    <li>
                        <Link to={'/aluno'}>Aluno</Link>
                    </li>
                </ul>
            </Container>
        )

    }

}


Alunos.propTypes = {
    isClosed: propTypes.bool
}