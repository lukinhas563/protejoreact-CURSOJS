import { legacy_createStore } from '@reduxjs/toolkit'

import rootReducer from './modules/rootReducer'

const store = legacy_createStore(rootReducer)

export default store