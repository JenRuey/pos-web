import { SAVE_TEMP_USER, SAVE_LOGIN_USER } from "../actions/UtilAction";
import { Base64 } from "js-base64";

const defaultState = {
  users: [{ usr: "root", password: Base64.encode("root") }],
  login_user: null
};

export default function utilReducer(state = defaultState, action) {
  switch (action.type) {
    case SAVE_TEMP_USER:
      let _users = [...state.users];
      _users.push(action.payload);
      return { ...state, users: _users };
    case SAVE_LOGIN_USER:
      return { ...state, login_user: action.payload };
    default:
      return state;
  }
}
