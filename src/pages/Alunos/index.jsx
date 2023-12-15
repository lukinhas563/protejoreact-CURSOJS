// CONDIÇÃO
import propTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import axios from '../../services/axios'
import { get } from 'lodash'

import { Title } from "./styled"
import { Container } from "../../styles/GlobalStyled"
import { AlunoContainer, FotoContainer } from './styled'
import { BsFillImageFill, BsPencilSquare, BsBackspaceFill } from "react-icons/bs";



export default function Alunos({ isClosed }) {

    const isLoggedIn = false

    const [alunos, setAlunos] = useState([])

    useEffect(() => {
        async function getData() {
            const response = await axios.get('/alunos')
            setAlunos(response.data)
        }

        getData()
    }, [])

    if (isClosed && !isLoggedIn) {

        toast.error('Eita porra')

        return (
            <Navigate to={'/register'} />
        )

    } else {

        return (
            <Container>

                <Title>
                    Lista de Alunos
                </Title>

                <AlunoContainer>
                    {alunos.map(aluno => (
                        <div key={String(aluno.id)}>
                            <FotoContainer>
                                {get(aluno, 'Fotos[0].url', false) ? (
                                    <img src={aluno.Fotos[0].url} alt='Fotos da galeria' />
                                ) : (
                                    <BsFillImageFill size={36} />
                                )}
                            </FotoContainer>
                            <span>{aluno.nome}</span>
                            <span>{aluno.email}</span>

                            <Link to={`/aluno/${aluno.id}/edit`}><BsPencilSquare size={16} /></Link>
                            <Link to={`/aluno/${aluno.id}/delete`}><BsBackspaceFill size={16} /></Link>
                        </div>
                    ))}
                </AlunoContainer>

            </Container>
        )

    }

}


Alunos.propTypes = {
    isClosed: propTypes.bool
}