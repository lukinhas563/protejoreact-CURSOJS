import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import { isEmail } from 'validator'
import { useDispatch, useSelector } from "react-redux"
import * as actions from '../../store/modules/auth/actions'

import { Title, Form } from "./styled"
import GlobalStyled from "../../styles/GlobalStyled"
import { Container } from "../../styles/GlobalStyled"
import Loading from "../../components/Loading"

export default function Register() {

    const dispatch = useDispatch()

    const id = useSelector(state => state.auth.user.id)
    const nomeStored = useSelector(state => state.auth.user.nome)
    const emailStored = useSelector(state => state.auth.user.email)
    const isLoading = useSelector(state => state.auth.isLoading)

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        if (!id) return

        setNome(nomeStored)
        setEmail(emailStored)

    }, [emailStored, id, nomeStored])

    async function handleSubmit(e) {

        e.preventDefault()
        let formErrors = false

        if (nome.length < 3 || nome.length > 255) {
            formErrors = true
            toast.error('Nome deve ter entre 3 e 255 caracteres')
        }

        if (!isEmail(email)) {
            formErrors = true
            toast.error('E-mail inválido')
        }

        if (!id && (password.length < 6 || password.length > 50)) {
            formErrors = true
            toast.error('Senha deve ter entre 6 e 50 caracteres')
        }

        if (formErrors) return

        dispatch(actions.registerRequest({ nome, email, password, id }))
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <GlobalStyled />
            <Title>
                {id ? 'Editar dados' : 'Crie sua conta'}
            </Title>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="nome">
                    Nome:
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" />
                </label>
                <label htmlFor="email">
                    Email:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu email" />
                </label>
                <label htmlFor="password">
                    Senha:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha" />
                </label>

                <button type="submit">{id ? 'Salvar' : 'Criar minha conta'}</button>
            </Form>
        </Container>
    )

}