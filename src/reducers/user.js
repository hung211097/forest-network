import {actionTypes} from '../constants/actionType'
import avatar1 from '../images/guy-2.jpg';
import avatar2 from '../images/guy-5.jpg';
import avatar3 from '../images/guy-6.jpg';
import avatar4 from '../images/woman-2.jpg';
import avatar5 from '../images/woman-3.jpg';
import avatar6 from '../images/woman-4.jpg';

const initialState = {
  users: [
    {
      id: 1,
      avatar: avatar1,
      username: "John Doe",
      career: "Graphics Designer",
      isFollow: false
    },
    {
      id: 2,
      avatar: avatar4,
      username: "Hillary Markston",
      career: "Product Manager",
      isFollow: false
    },
    {
      id: 3,
      avatar: avatar3,
      username: "Luna Stark",
      career: "Senior Developer",
      isFollow: false
    },
    {
      id: 4,
      avatar: avatar2,
      username: "Maria Gonzales",
      career: "DevOps",
      isFollow: true
    },
    {
      id: 5,
      avatar: avatar5,
      username: "Leidy marshel",
      career: "Graphics Designer",
      isFollow: true
    },
    {
      id: 6,
      avatar: avatar6,
      username: "Presilla bo",
      career: "Accountant",
      isFollow: false
    }
  ]
}

export default (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FOLLOW_USER:
    let temp = state.users.map((item) => {
      if(item.id === action.idUser){
        item.isFollow = !item.isFollow
      }
      return item
    })
    return{
      ...state,
      users: temp
    }
    default:
      return state
  }
}
