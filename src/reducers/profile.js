// import {actionTypes} from '../constants/actionType';
import avatar from '../images/guy-3.jpg';

const initialState = {
  info: {
    fullname: "John Breakgrow",
    username: "John Breakgrow jr.",
    avatar: avatar
  }
}

export default (state = initialState, action) => {
  switch(action.type){
    default:
      return state
  }
}
