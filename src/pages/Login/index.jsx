import { useState } from "react"
import { toast } from 'react-toastify'
import { isEmail } from 'validator'

import * as actions from '../../store/modules/auth/actions'
import { useDispatch, useSelector } from 'react-redux'


import { Title, Form } from "./styled"
import GlobalStyled from "../../styles/GlobalStyled"
import { Container } from "../../styles/GlobalStyled"
import Loading from '../../components/Loading/index'

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLoading = useSelector(state => state.auth.isLoading)

    const dispatch = useDispatch()

    const handleSubmit = e => {

        e.preventDefault()
        let formErrors = false

        if (!isEmail(email)) {
            formErrors = true
            toast.error('E-mail inválido')
        }

        if (password.length < 6 || password.length > 50) {
            formErrors = true
            toast.error('Senha inválida')
        }

        if (formErrors) return;

        dispatch(actions.loginRequest({ email, password }))
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <GlobalStyled />
            <Title>
                LOGIN
            </Title>
            <Form onSubmit={e => handleSubmit(e)}>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu e-mail" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha" />
                <button type="submit">Entrar</button>
            </Form>
        </Container>
    )

}