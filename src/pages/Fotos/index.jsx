import propTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import { useDispatch } from 'react-redux'
import Loading from '../../components/Loading'

import { Title, Form } from "./styled"
import GlobalStyled from "../../styles/GlobalStyled"
import { Container } from "../../styles/GlobalStyled"
import { useEffect, useState } from 'react'
import axios from '../../services/axios'
import * as actions from '../../store/modules/auth/actions'

export default function Fotos({ isClosed }) {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const [foto, setFoto] = useState('')

    useEffect(() => {

        async function getData() {

            try {
                setIsLoading(true)
                const { data } = await axios.get(`/alunos/${id}`)
                setFoto(get(data, 'Foto[0].url', ''))
                setIsLoading(false)
            } catch {
                toast.error('Erro ao obter imagem')
                setIsLoading(false)
                navigate('/')
            }
        }

        getData()

    }, [])

    const handleChange = async (e) => {
        const file = e.target.files[0]
        const fotoURL = URL.createObjectURL(file)

        setFoto(fotoURL)

        const formData = new FormData()
        formData.append('aluno_id', id)
        formData.append('foto', file)

        try {

            setIsLoading(true)
            await axios.post('/photos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            toast.success('Foto enviada com sucesso!')

            setIsLoading(false)

        } catch (err) {
            setIsLoading(false)
            const { status } = get(err, 'response', '')
            toast.error('Erro ao enviar foto.')

            if (status === 401) dispatch(actions.loginFailure())
        }

    }

    if (isClosed && !isLoggedIn) {
        toast.error('Usuário não cadastrado')
        return (
            <Navigate to={'/register'} />
        )

    } else {

        return (
            <Container>
                <Loading isLoading={isLoading} />
                <GlobalStyled />
                <Title>
                    Fotos
                </Title>

                <Form>
                    <label htmlFor="foto">
                        {foto ? <img src={foto} alt='foto' /> : 'Selecionar'}
                        <input type="file" id='foto' onChange={(e) => handleChange(e)} />
                    </label>
                </Form>
            </Container>
        )


    }

}

Fotos.propTypes = {
    isClosed: propTypes.bool
}