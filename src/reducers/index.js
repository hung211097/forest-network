import {combineReducers} from 'redux'
import profileReducer from './profile'
import postsReducer from './post'

const rootReducer = combineReducers({
  profileReducer,
  postsReducer
})

export default rootReducer;
