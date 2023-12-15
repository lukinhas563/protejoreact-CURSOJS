import { call, put, all, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import * as actions from './actions'
import * as types from '../types'
import axios from '../../../services/axios'


function* loginRequest({ payload }) {


    try {

        const responde = yield call(axios.post, '/tokens/', payload)

        yield put(actions.loginSuccess({ ...responde.data }))

        toast.success('Logado com sucesso')

        axios.defaults.headers.Authorization = `Bearer ${responde.data.token}`


    } catch (e) {

        toast.error('Usuário ou senha inválida')

        yield put(actions.loginFailure)

    }

}

export default all([

    takeLatest(types.LOGIN_REQUEST, loginRequest)

])