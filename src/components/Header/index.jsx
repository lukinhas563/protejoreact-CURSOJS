import { BsFillHouseDoorFill, BsDoorClosedFill, BsFillPeopleFill, BsPersonCircle, BsPower } from "react-icons/bs";
import { useSelector } from 'react-redux'

import { Link } from "react-router-dom"
import { Nav } from "./styled"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from '../../store/modules/auth/actions'

export default function Header() {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout(e) {
        e.preventDefault();

        dispatch(actions.loginFailure())

        navigate('/')
    }

    return (

        <Nav>
            <Link to={'/'}><BsFillHouseDoorFill size={24} /></Link>

            {isLoggedIn ? (
                <Link onClick={(e) => handleLogout(e)} to={'/login'}><BsPower size={24} /></Link>
            ) : (
                <Link to={'/login'}><BsDoorClosedFill size={24} /></Link>
            )}

            <Link to={'/register'}><BsFillPeopleFill size={24} /></Link>

            {isLoggedIn && <BsPersonCircle size={24} color="#66ff33" />}

        </Nav>

    )
}