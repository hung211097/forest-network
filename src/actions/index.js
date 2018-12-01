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

export const createPost = (post) => {
  return{
    type: actionTypes.NEW_POST,
    post: post
  }
}

export const createComment = (comment, id) => {
  return{
    type: actionTypes.NEW_COMMENT,
    comment: comment,
    idPost: id
  }
}
