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

export const updateProfile = (info) => {
  return{
    type: actionTypes.UPDATE_PROFILE,
    info: info
  }
}

export const saveProfileFromApi = (info) => {
  return{
    type: actionTypes.SAVE_PROFILE,
    info: info
  }
}

export const updatePost = (user) => {
  return{
    type: actionTypes.UPDATE_POST,
    user: user
  }
}

export const followUser = (user_id) => {
  return{
    type: actionTypes.FOLLOW_USER,
    id: user_id
  }
}

export const unFollowUser = (user_id) => {
  return{
    type: actionTypes.UNFOLLOW_USER,
    id: user_id
  }
}
