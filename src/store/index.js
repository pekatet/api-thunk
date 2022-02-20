import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import listReducer from '../reducers/listReducer'
import formReducer from '../reducers/formReducer'

const reducer = combineReducers({
  serviceList: listReducer,
  form: formReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store