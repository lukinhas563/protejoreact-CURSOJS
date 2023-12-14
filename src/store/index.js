import { legacy_createStore } from '@reduxjs/toolkit'

const initialState = {
    botaoClicado: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BOTAO_CLICADO': {
            const newState = { ...state }
            newState.botaoClicado = !newState.botaoClicado
            console.log(newState.botaoClicado)
            return newState
        }

        default: {
            return state
        }
    }
}

const store = legacy_createStore(reducer)

export default store