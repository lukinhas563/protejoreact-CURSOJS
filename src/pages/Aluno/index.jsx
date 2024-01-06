import propTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import { useDispatch } from 'react-redux'
import { FaEdit, FaUserCircle } from 'react-icons/fa'

import { Title, Form, ProfilePicture } from "./styled"
import GlobalStyled from "../../styles/GlobalStyled"
import { Container } from "../../styles/GlobalStyled"
import { useState, useEffect } from 'react'
import { isEmail, isInt, isFloat } from 'validator'
import Loading from '../../components/Loading'
import axios from '../../services/axios'
import * as actions from '../../store/modules/auth/actions'

export default function Aluno({ isClosed }) {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [email, setEmail] = useState('')
    const [idade, setIdade] = useState('')
    const [peso, setPeso] = useState('')
    const [altura, setAltura] = useState('')
    const [foto, setFoto] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { id } = useParams()

    useEffect(() => {

        if (!id) return

        async function getData() {

            try {

                setIsLoading(true)
                const { data } = await axios.get(`/alunos/${id}`)
                const Foto = get(data, 'Fotos[0].url', '');

                setFoto(Foto)
                setNome(data.nome)
                setSobrenome(data.sobrenome)
                setEmail(data.email)
                setIdade(data.idade)
                setPeso(data.peso)
                setAltura(data.altura)

                setIsLoading(false)

            } catch (err) {

                setIsLoading(false)
                const status = get(err, 'response.status', 0)
                const errors = get(err, 'response.data.errors', [])

                if (status === 400) errors.map(error => toast.error(error))
                navigate('/')
            }

        }

        getData()
    }, [id])

    async function handleSubmit(e) {
        e.preventDefault()
        let formErrors = false

        if (nome.length < 3 || nome.length > 255) {
            formErrors = true
            toast.error('Nome precisa ter entre 3 e 255 caracteres.')
        }


        if (sobrenome.length < 3 || sobrenome.length > 255) {
            formErrors = true
            toast.error('Sobrenome precisa ter entre 3 e 255 caracteres.')
        }

        if (!isEmail(email)) {
            formErrors = true
            toast.error('E-mail inválido')
        }

        if (!isInt(String(idade))) {
            formErrors = true
            toast.error('Idade inválida')
        }

        if (!isFloat(String(peso))) {
            formErrors = true
            toast.error('Peso inválida')
        }

        if (!isFloat(String(altura))) {
            formErrors = true
            toast.error('Altura inválida')
        }

        if (formErrors) return

        try {

            setIsLoading(true)

            if (id) {
                //Editando
                await axios.put(`/alunos/${id}`, {
                    nome,
                    sobrenome,
                    email,
                    idade,
                    peso,
                    altura
                })

                toast.success('Aluno(a) editado(a) com sucesso!')


            } else {
                //Criando
                const { data } = await axios.post(`/alunos/`, {
                    nome,
                    sobrenome,
                    email,
                    idade,
                    peso,
                    altura
                })

                toast.success('Aluno(a) criado(a) com sucesso!')
                navigate(`/aluno/${data.id}/edit`)
            }

            setIsLoading(false)

        } catch (err) {

            setIsLoading(false)
            const status = get(err, 'response.status', 0)
            const data = get(err, 'response.data', {})
            const errors = get(data, 'errors', [])

            if (errors.length > 0) {
                errors.map(error => toast.error(error))
            } else {
                toast.error('Erro desconhecido')
            }

            if (status === 401) {
                dispatch(actions.loginFailure())
            }

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
                    {id ? 'Editar aluno' : 'Novo Aluno'}
                </Title>

                {id && (
                    <ProfilePicture>
                        {foto ? (
                            <img src={foto} alt={nome} />
                        ) : (
                            <FaUserCircle size={180} />
                        )}
                        <Link to={`/fotos/${id}`}>
                            <FaEdit size={24} />
                        </Link>
                    </ProfilePicture>
                )}

                <Form onSubmit={(e) => handleSubmit(e)}>
                    <input type='text' value={nome} onChange={e => setNome(e.target.value)} placeholder='Nome' />
                    <input type='text' value={sobrenome} onChange={e => setSobrenome(e.target.value)} placeholder='Sobrenome' />
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
                    <input type='number' value={idade} onChange={e => setIdade(e.target.value)} placeholder='Idade' />
                    <input type='text' value={peso} onChange={e => setPeso(e.target.value)} placeholder='Peso' />
                    <input type='text' value={altura} onChange={e => setAltura(e.target.value)} placeholder='Altura' />

                    <button type='submit'>Enviar</button>
                </Form>

            </Container>
        )


    }

}

Aluno.propTypes = {
    isClosed: propTypes.bool
}