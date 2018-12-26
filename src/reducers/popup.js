import {actionTypes} from '../constants/actionType'

const initialState = {
  isShowPopup: false,
  post_id: null
}

export default (state = initialState, action) => {
  switch(action.type){
    case actionTypes.SHOW_POPUP:
      return{
        ...state,
        isShowPopup: true,
        post_id: action.post_id
      }
    case actionTypes.CLOSE_POPUP:
      return{
        ...state,
        isShowPopup: false,
        post_id: null
      }
    default:
      return state
  }
}
