import { useEffect } from "react"
import axios from "../../services/axios"

import GlobalStyled from "../../styles/GlobalStyled"
import { Container } from "../../styles/GlobalStyled"

export default function Home() {

    useEffect(() => {

        async function getDate() {
            const response = await axios.get('/alunos');
            console.log(response);
        }
        getDate()
    }, [])

    return (
        <Container>
            <GlobalStyled />
            <h1>Home</h1>
        </Container>
    )
}