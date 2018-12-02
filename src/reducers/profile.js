import {actionTypes} from '../constants/actionType';
import avatar from '../images/guy-3.jpg';

const initialState = {
  info: {
    fullname: "John Breakgrow",
    username: "John Breakgrow jr.",
    avatar: avatar
  },
	status: 2
}

export default (state = initialState, action) => {
  switch(action.type){
		case actionTypes.CHOOSE_TAG_PROFILE:
			return {
			...state,
			status: action.status
			};			
		
    default:
      return state
  }
}
