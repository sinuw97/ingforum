import api from '../../utils/api.js';

const ActionType = {
  RECEIVE_USER: 'RECEIVE_USER',
};

function receiveUserActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USER,
    payload: {
      users,
    }
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async () => {
    try {
      await api.register({ name, email, password });
    } catch (e) {
      throw new Error(e.message);
    }
  };
}

export {
  ActionType,
  receiveUserActionCreator,
  asyncRegisterUser,
};