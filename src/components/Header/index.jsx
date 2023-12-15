import { BsFillHouseDoorFill, BsDoorClosedFill, BsFillPeopleFill } from "react-icons/bs";

import { Link } from "react-router-dom"
import { Nav } from "./styled";


export default function Header() {


    return (

        <Nav>
            <Link to={'/'}><BsFillHouseDoorFill size={24} /></Link>
            <Link to={'/login'}><BsDoorClosedFill size={24} /></Link>
            <Link to={'/register'}><BsFillPeopleFill size={24} /></Link>
        </Nav>

    )
}