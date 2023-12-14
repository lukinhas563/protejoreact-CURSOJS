import { BsFillHouseDoorFill, BsDoorClosedFill } from "react-icons/bs";

import { Link } from "react-router-dom"
import { Nav } from "./styled";

export default function Header() {

    return (

        <Nav>
            <Link to={'/'}><BsFillHouseDoorFill size={24} /></Link>
            <Link to={'/login'}><BsDoorClosedFill size={24} /></Link>
            <Link to={'/contato'}>Contato</Link>
        </Nav>

    )
}