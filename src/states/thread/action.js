import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  ADD_THREAD: 'ADD_THREAD',
  RECEIVE_THREAD: 'RECEIVE_THREAD',
  TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREAD',
  TOGGLE_DISLIKE_THREAD: 'TOGGLE_DISLIKE_THREAD',
};

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function receiveThreadActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREAD,
    payload: {
      threads,
    },
  };
}

function toggleLikeThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDislikeThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DISLIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, category, body }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const result = await api.createThread({ title, category, body });
      dispatch(addThreadActionCreator(result));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncReceiveAllThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      const users = await api.getAllUsers();

      const threadWithOwner = threads.map((thread) => {
        const owner = users.find((user) => user.id === thread.ownerId);
        return {
          ...thread,
          owner: {
            id: owner.id,
            name: owner.name,
            avatar: owner.avatar
          },
        };
      });

      dispatch(receiveThreadActionCreator(threadWithOwner));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threads } = getState();
    const thread = threads.find((thread) => thread.id === threadId);
    const userId = authUser.id;

    const hasLike = thread.upVotesBy.includes(userId);
    const hasDislike = thread.downVotesBy.includes(userId);

    if (hasDislike) {
      dispatch(toggleDislikeThreadActionCreator({ threadId, userId }));
    }
    dispatch(toggleLikeThreadActionCreator({ threadId, userId }));

    try {
      if (hasLike) {
        await api.neutralVoteThread(threadId);
      } else {
        if (hasDislike) {
          await api.neutralVoteThread(threadId);
        }
        await api.upVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);

      if (!hasLike) {
        dispatch(toggleLikeThreadActionCreator({ threadId, userId }));
        if (hasDislike) {
          dispatch(toggleDislikeThreadActionCreator({ threadId, userId }));
        }
      }
    }
    dispatch(hideLoading());
  };
}


function asyncToggleDislikeThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threads } = getState();
    const thread = threads.find((thread) => thread.id === threadId);
    const userId = authUser.id;

    const hasDislike = thread.downVotesBy.includes(userId);
    const hasLike = thread.upVotesBy.includes(userId);

    if (hasLike) {
      dispatch(toggleLikeThreadActionCreator({ threadId, userId }));
    }
    dispatch(toggleDislikeThreadActionCreator({ threadId, userId }));

    try {
      if (hasDislike) {
        await api.neutralVoteThread(threadId);
      } else {
        if (hasLike) {
          await api.neutralVoteThread(threadId);
        }
        await api.downVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);

      if (!hasDislike) {
        dispatch(toggleDislikeThreadActionCreator({ threadId, userId }));
        if (hasLike) {
          dispatch(toggleLikeThreadActionCreator({ threadId, userId }));
        }
      }
    }
    dispatch(hideLoading());
  };
}


export {
  ActionType,
  addThreadActionCreator,
  receiveThreadActionCreator,
  toggleLikeThreadActionCreator,
  toggleDislikeThreadActionCreator,
  asyncAddThread,
  asyncReceiveAllThreads,
  asyncToggleLikeThread,
  asyncToggleDislikeThread,
};