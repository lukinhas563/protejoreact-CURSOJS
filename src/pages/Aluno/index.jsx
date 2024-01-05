import propTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { get } from 'lodash'

import { Title, Form } from "./styled"
import GlobalStyled from "../../styles/GlobalStyled"
import { Container } from "../../styles/GlobalStyled"
import { useState, useEffect } from 'react'
import { isEmail, isInt, isFloat } from 'validator'
import Loading from '../../components/Loading'
import axios from '../../services/axios'

export default function Aluno({ isClosed }) {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [email, setEmail] = useState('')
    const [idade, setIdade] = useState('')
    const [peso, setPeso] = useState('')
    const [altura, setAltura] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { id } = useParams()

    useEffect(() => {

        if (!id) return

        async function getData() {

            try {

                setIsLoading(true)
                const { data } = await axios.get(`/alunos/${id}`)
                const Foto = get(data, 'Fotos[0].url', '');

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


            }

        }

        getData()
    }, [id])

    function handleSubmit(e) {
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