import { useState } from "react"
import { toast } from 'react-toastify'
import { isEmail } from 'validator'

import * as actions from '../../store/modules/auth/actions'
import { useDispatch } from 'react-redux'

import { Title, Form } from "./styled"
import GlobalStyled from "../../styles/GlobalStyled"
import { Container } from "../../styles/GlobalStyled"

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

        dispatch(actions.loginReques({ email, password }))
    }

    return (
        <Container>
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