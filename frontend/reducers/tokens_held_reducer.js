import { CURRENT_USER } from "../actions/session_actions";
import { GET_USER_INFO } from "../actions/user_actions";

const tokensHeldReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = state.slice();
  let tokensHeld;
  switch (action.type) {
    case CURRENT_USER:
      tokensHeld = Object.keys(action.currentUser.tokensHeld);
      tokensHeld.forEach((key) => {
        newState.push(action.currentUser.tokensHeld[key]);
      });
      return newState;
    case GET_USER_INFO:
      if (action.user.tokensHeld.length !== newState.length) {
        tokensHeld = Object.keys(action.user.tokensHeld);
        tokensHeld.forEach((key) => {
          newState.push(action.user.tokensHeld[key]);
        });
      } 
      return newState;
    default:
      return state;
  }
}

export default tokensHeldReducer;