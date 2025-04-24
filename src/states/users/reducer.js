import { ActionType } from './action';

function userReducer(users = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_USER:
    return action.payload.users;
  default:
    return users;
  }
}

export default userReducer;