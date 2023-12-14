import { Title, Paragrafo } from "./styled"
import { useDispatch } from "react-redux";

import GlobalStyled from "../../styles/GlobalStyled"
import { Container } from "../../styles/GlobalStyled"

export default function Login() {

    const dispath = useDispatch()

    function handleClick(e) {
        e.preventDefault();

        dispath({
            type: 'BOTAO_CLICADO'
        })

        dispath({
            type: 'BOTAO_CLICADO'
        })
    }

    return (
        <Container>
            <GlobalStyled />
            <Title>
                LOGIN,
                <small>Clique para Logar</small>
            </Title>
            <Paragrafo>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum molestias id
                fuga eos a alias ex? Non, eligendi impedit libero architecto est blanditiis!
                Placeat modi officiis maxime facilis quas dolor?</Paragrafo>
            <button type="button" onClick={(e) => handleClick(e)}>Enviar</button>
        </Container>
    )
}