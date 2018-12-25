import {actionTypes} from '../constants/actionType';

const initialState = {
  info: {
    // user_id: 1,
    fullname: "",
    username: "",
    avatar: undefined,
    following: [],
    follower: []
  }
}

export default (state = initialState, action) => {
  switch(action.type){
    case actionTypes.UPDATE_PROFILE:
      return{
        ...state,
        info: {...state.info, ...action.info}
      }
    case actionTypes.SAVE_PROFILE:
      return{
        ...state,
        info:{
          fullname: state.info.fullname,
          ...action.info
        }
      }
    case actionTypes.FOLLOW_USER:
      return{
        ...state,
        info:{
          ...state.info,
          fullname: state.info.fullname,
          following: [...state.info.following, action.id],
        }
      }
    case actionTypes.UNFOLLOW_USER:
      let tempArr = state.info.following.filter((item) => {
        return item !== action.id
      })
      return{
        ...state,
        info:{
          ...state.info,
          fullname: state.info.fullname,
          following: tempArr,
        }
      }
    default:
      return state
  }
}
