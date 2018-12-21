import {actionTypes} from '../constants/actionType'
import avatar1 from '../images/guy-3.jpg';
import avatar2 from '../images/guy-5.jpg';
import avatar3 from '../images/guy-6.jpg';

const initialState = {
  posts: [
    {
      id: 1,
      avatar: avatar1,
      user_id: 1,
      username: "John Breakgrow",
      authorize: "Shared publicly",
      created_on: "Sat Dec 01 2018 09:56:49 GMT+0700 (Indochina Time)",
      likes: 100,
      isLike: false,
      content: "Hello World!",
      comments: [
        {
          avatar: avatar2,
          user_id: 3,
          username: "Maria Gonzales",
          content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          created_on: "Sat Dec 01 2018 10:56:49 GMT+0700 (Indochina Time)"
        },
        {
          avatar: avatar3,
          user_id: 2,
          username: "Luna Stark",
          content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          created_on: "Sat Dec 01 2018 11:00:49 GMT+0700 (Indochina Time)"
        }
      ]
    },
    {
      id: 2,
      avatar: avatar3,
      user_id: 2,
      username: "Luna Stark",
      authorize: "Shared publicly",
      created_on: "Thu Dec 29 2018 10:32:49 GMT+0700 (Indochina Time)",
      likes: 12,
      isLike: false,
      content: "I took this photo this morning. What do you guys think?",
      comments: [
        {
          avatar: avatar2,
          user_id: 3,
          username: "Maria Gonzales",
          content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          created_on: "Sat Dec 01 2018 10:56:49 GMT+0700 (Indochina Time)"
        },
        {
          avatar: avatar1,
          user_id: 1,
          username: "John Breakgrow",
          content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          created_on: "Sat Dec 01 2018 11:00:49 GMT+0700 (Indochina Time)"
        }
      ]
    },
    {
      id: 3,
      avatar: avatar3,
      user_id: 2,
      username: "Huỳnh",
      authorize: "Shared publicly",
      created_on: "Thu Dec 29 2018 10:32:49 GMT+0700 (Indochina Time)",
      likes: 12,
      isLike: false,
      content: "I took this photo this morning. What do you guys think?",
      comments: [
        {
          avatar: avatar2,
          user_id: 3,
          username: "Maria Gonzales",
          content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          created_on: "Sat Dec 01 2018 10:56:49 GMT+0700 (Indochina Time)"
        },
        {
          avatar: avatar1,
          user_id: 1,
          username: "John Breakgrow",
          content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          created_on: "Sat Dec 01 2018 11:00:49 GMT+0700 (Indochina Time)"
        }
      ]
    },
    {
      id: 4,
      avatar: avatar3,
      user_id: 2,
      username: "Hưng",
      authorize: "Shared publicly",
      created_on: "Thu Dec 29 2018 10:32:49 GMT+0700 (Indochina Time)",
      likes: 12,
      isLike: false,
      content: "I took this photo this morning. What do you guys think?",
      comments: [
        {
          avatar: avatar2,
          user_id: 3,
          username: "Maria Gonzales",
          content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          created_on: "Sat Dec 01 2018 10:56:49 GMT+0700 (Indochina Time)"
        },
        {
          avatar: avatar1,
          user_id: 1,
          username: "John Breakgrow",
          content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          created_on: "Sat Dec 01 2018 11:00:49 GMT+0700 (Indochina Time)"
        }
      ]
    }
  ]
}

export default (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LIKE_POST:
      let temp = state.posts.map((item) => {
        if(item.id === action.idPost){
          item.isLike = !item.isLike
          if(item.isLike){
            item.likes = item.likes + 1
          }
          else{
            item.likes = item.likes - 1
          }
        }
        return item
      })
      return {
        ...state,
        posts: temp
      }
    case actionTypes.NEW_POST:
      return{
        ...state,
        posts: [action.post, ...state.posts]
      }
    case actionTypes.NEW_COMMENT:
      temp = state.posts.map((item) => {
        if(item.id === action.idPost){
          item.comments = [...item.comments, action.comment]
        }
        return item
      })
      return{
        ...state,
        posts: temp
      }
    case actionTypes.UPDATE_POST:
      temp = state.posts.map((item) => {
        if(item.user_id === action.user.id){
          item.username = action.user.username
        }
        item.comments = item.comments.map((cmt) => {
          if(cmt.user_id === action.user.id){
            cmt.username = action.user.username
          }
          return cmt
        })
        return item
      })
      return{
        ...state,
        posts: temp
      }
    default:
      return state
  }
}
