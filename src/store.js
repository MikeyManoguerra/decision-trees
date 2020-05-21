import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'

import nodeReducer from './reducers/nodes'
import studentReducer from './reducers/student'
import adventureReducer from './reducers/adventure'
import { loadAuthToken } from './utils/local-storage'
import { reducer as loginReducer } from './reducers/auth'
import { setAuthToken, refreshAuthToken } from './actions/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    form: formReducer,
    node: nodeReducer,
    auth: loginReducer,
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
