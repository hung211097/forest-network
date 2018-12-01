import {actionTypes} from '../constants/actionType';
import avatar from '../images/guy-3.jpg';

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
  }
}

export default (state = initialState, action) => {
  switch(action.type){
    case actionTypes.UPDATE_PROFILE:
      return{
        ...state,
        info: {fullname: state.info.fullname, ...action.info}
      }
    default:
      return state
  }
}
