// CONDIÇÃO
import propTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import axios from '../../services/axios'
import { get } from 'lodash'

import { Title } from "./styled"
import Loading from '../../components/Loading/index'
import { Container } from "../../styles/GlobalStyled"
import { AlunoContainer, FotoContainer } from './styled'
import { BsFillImageFill, BsPencilSquare, BsBackspaceFill } from "react-icons/bs"



export default function Alunos({ isClosed }) {

    const isLoggedIn = false

    const [alunos, setAlunos] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getData() {
            setIsLoading(true)
            const response = await axios.get('/alunos')
            setAlunos(response.data)
            setIsLoading(false)
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
                <Loading isLoading={isLoading} />
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