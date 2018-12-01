import {actionTypes} from '../constants/actionType'

export const demo = () => {
  return (dispatch, getState) => {

  }
}

export const likePost = (id) => {
  return{
    type: actionTypes.LIKE_POST,
    idPost: id
  }
}
