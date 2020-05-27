import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'

import { studentReducer } from './Student'
import { adventureReducer, nodeReducer } from './Teacher'
import { loadAuthToken } from './utils/local-storage'
import { setAuthToken, refreshAuthToken, authReducer } from './Auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    form: formReducer,
    node: nodeReducer,
    auth: authReducer,
    student: studentReducer,
    adventure: adventureReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
)

const authToken = loadAuthToken()

if (authToken) {
  const token = authToken
  store.dispatch(setAuthToken(token))
  store.dispatch(refreshAuthToken())
}

export default store
