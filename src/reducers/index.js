import {combineReducers} from 'redux'
import profileReducer from './profile'
import usersReducer from './user'
import postsReducer from './post'

const rootReducer = combineReducers({
  profileReducer,
  usersReducer,
  postsReducer
})

export default rootReducer;
