import { BsFillHouseDoorFill, BsDoorClosedFill } from "react-icons/bs";
import { useSelector } from 'react-redux'

import { Link } from "react-router-dom"
import { Nav } from "./styled";


export default function Header() {

    const botaoClicado = useSelector(state => state.example.botaoClicado)

    return (

        <Nav>
            <Link to={'/'}><BsFillHouseDoorFill size={24} /></Link>
            <Link to={'/login'}><BsDoorClosedFill size={24} /></Link>
            <Link to={'/contato'}>Contato</Link>
            {botaoClicado ? 'Clicado' : 'Não Clicado'}
        </Nav>

    )
}