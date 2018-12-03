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

export const followUser = (id) => {
  return{
    type: actionTypes.FOLLOW_USER,
    idUser: id
  }
}

export const chooseTagProfile = (num) => {
  return{
    type: actionTypes.CHOOSE_TAG_PROFILE,
    status: num
  }
}

export const changeFollowingUser = (contact) => {
  return{
    type: actionTypes.CHANGE_FOLLOWING_USER,
    contactUser: contact

export const updateProfile = (info) => {
  return{
    type: actionTypes.UPDATE_PROFILE,
    info: info
  }
}
