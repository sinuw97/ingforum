import { ActionType } from './action';

function leaderboardsReducer(state = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_LEADERBOARDS:
    return action.payload;
  default:
    return state;
  }
}

export default leaderboardsReducer;