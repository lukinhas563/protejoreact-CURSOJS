import propTypes from 'prop-types'
import { Container } from './styled'

export default function Loading({ isLoading }) {
    if (!isLoading) return <></>
    return (
        <Container>
            <div />
            <span>Carregando...</span>
        </Container>
    )
}

Loading.propTypes = {
    isLoading: false
}

Loading.propTypes = {
    isLoading: propTypes.bool,
}