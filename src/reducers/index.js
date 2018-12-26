import {combineReducers} from 'redux'
import profileReducer from './profile'
import popupReducer from './popup'

const rootReducer = combineReducers({
  profileReducer,
  popupReducer
})

export default rootReducer;
