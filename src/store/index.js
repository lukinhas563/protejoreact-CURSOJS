import { persistStore } from 'redux-persist'
import { legacy_createStore, applyMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import persistedReducers from './modules/reduxPersist'

import rootReducer from './modules/rootReducer'
import rootSaga from './modules/rootSagas'

const sagaMiddleware = createSagaMiddleware()

const store = legacy_createStore(
    persistedReducers(rootReducer),
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
export default store