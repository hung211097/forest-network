import {actionTypes} from '../constants/actionType';
import avatar from '../images/guy-3.jpg';
import avatar1 from '../images/guy-2.jpg';
import avatar2 from '../images/guy-5.jpg';
import avatar3 from '../images/guy-6.jpg';
import avatar4 from '../images/woman-2.jpg';
import avatar5 from '../images/woman-3.jpg';
import avatar6 from '../images/woman-4.jpg';

const initialState = {
  info: {
    fullname: "John Breakgrow",
    username: "John Breakgrow jr.",
    avatar: avatar,
    birthday: "1990-11-21",
    gender: "male",
    email: "me@jonasmith.com",
    phone: "1234567890",
    address: "Riverside City 66, 80123 Denver, Colorado",
    about: `Dramatically facilitate proactive solutions whereas professional intellectual capital. Holisticly utilize competitive e-markets through intermandated meta-services. Objectively.<br/><br/>Monotonectally foster future-proof infomediaries before principle-centered interfaces.Assertively recaptiualize cutting-edge web services rather than emerging "outside the box" thinking. Phosfluorescently cultivate resource maximizing technologies and user-centric convergence. Completely underwhelm
cross functional innovation vis-a-vis.`
  },
	status: 2,
	numFollowers: 5,
	usersFollow: [
    {
      id: 1,
      avatar: avatar1,
      username: "Michael",
      contact: "@iamichael",
      isFollow: true
    },
    {
      id: 2,
      avatar: avatar5,
      username: "Stella",
      contact: "@stella",
      isFollow: false
    },
    {
      id: 3,
      avatar: avatar6,
      username: "Jane Doe",
      contact: "@janed",
      isFollow: true
    },
    {
      id: 4,
      avatar: avatar2,
      username: "John Simmons",
      contact: "@jsimm",
      isFollow: false
    },
    {
      id: 5,
      avatar: avatar3,
      username: "Antonius",
      contact: "@mrantonius",
      isFollow: true
    }
  ],
	numFollowing: 3,
	usersFollowing: [
    {
      id: 1,
      avatar: avatar4,
      username: "Jane Doe",
      contact: "@janed"
    },
    {
      id: 2,
      avatar: avatar2,
      username: "Michael",
      contact: "@iamichael"
    },
    {
      id: 3,
      avatar: avatar3,
      username: "Antonius",
      contact: "@mrantonius"
    }
  ]
}

export default (state = initialState, action) => {
  switch(action.type){
		case actionTypes.CHOOSE_TAG_PROFILE:
			return {
			...state,
			status: action.status
			};			
		case actionTypes.CHANGE_FOLLOWING_USER:
			let numFollowingTemp = state.numFollowing;
			let usersFollowingTemp = state.usersFollowing;
			let temp = state.usersFollow.map((item) => {
				if(item.contact === action.contactUser){
					item.isFollow ? numFollowingTemp-- : numFollowingTemp++;
					if (item.isFollow){
						usersFollowingTemp = usersFollowingTemp.filter(user => user.contact !== item.contact);
					}
					else{
						let itemTemp = item;
						itemTemp.id = state.numFollowing + 1;
						usersFollowingTemp = usersFollowingTemp.concat(item);
					}
					item.isFollow = !item.isFollow;
				}
				return item
			});
			return{
				...state,
				usersFollow: temp,
				numFollowing: numFollowingTemp,
				usersFollowing: usersFollowingTemp
			};
    case actionTypes.UPDATE_PROFILE:
      return{
        ...state,
        info: {fullname: state.info.fullname, ...action.info}
      }
    default:
      return state
  }
}
