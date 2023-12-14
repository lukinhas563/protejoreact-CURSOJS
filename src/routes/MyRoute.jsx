import { Navigate, Route } from 'react-router-dom'
import propTypes from 'prop-types'

export default function MinhaRota({ component: Component, isClosed, ...rest }) {

    const isLoggedIn = false

    if (isClosed && !isLoggedIn) {
        return (
            <Navigate to={{ pathname: 'login', state: { prevPath: rest.location.pathname } }} />
        )
    }

    return (
        <Route {...rest} component={Component} />
    )

}

MinhaRota.prototype = {
    component: propTypes.oneOfType([propTypes.element, propTypes.func]).isRequired,
    isClosed: propTypes.bool,
}