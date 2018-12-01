import {combineReducers} from 'redux'
import profileReducer from './profile'
import userReducer from './user'
import postReducer from './post'

const rootReducer = combineReducers({
  profileReducer,
  userReducer,
  postReducer
})

export default rootReducer;
