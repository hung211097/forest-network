import {actionTypes} from '../constants/actionType'

export const demo = () => {
  return (dispatch, getState) => {

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
