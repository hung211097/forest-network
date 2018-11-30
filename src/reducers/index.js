import {combineReducers} from 'redux'
import profileReducer from './profile'
import userReducer from './user'
import postReducer from './post'

const rootReducer = combineReducers({
  profile: profileReducer,
  users: userReducer,
  post: postReducer
})

export default rootReducer;
