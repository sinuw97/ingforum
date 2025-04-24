import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  TOGGLE_LIKE_DETAIL_THREAD: 'TOGGLE_LIKE_DETAIL_THREAD',
  TOGGLE_DISLIKE_DETAIL_THREAD: 'TOGGLE_DISLIKE_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_LIKE_COMMENT: 'TOGGLE_LIKE_COMMENT',
  TOGGLE_DISLIKE_COMMENT: 'TOGGLE_DISLIKE_COMMENT',
};

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function receiveDetailThreadActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function toggleLikeDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_DETAIL_THREAD,
    payload: { threadId, userId },
  };
}

function toggleDislikeDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DISLIKE_DETAIL_THREAD,
    payload: { threadId, userId },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function toggleLikeCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDislikeCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DISLIKE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncAddComment(content, threadId) {
  return async (dispatch) => {
    dispatch(hideLoading());
    try {
      const comment = await api.createComment(content, threadId);
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(hideLoading());
    dispatch(clearDetailThreadActionCreator());
    try {
      const detailThread = await api.getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDetailToggleLikeThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(hideLoading());
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;

    const hasLike = threadDetail.upVotesBy.includes(userId);
    const hasDislike = threadDetail.downVotesBy.includes(userId);

    if (hasDislike) {
      dispatch(toggleDislikeDetailThreadActionCreator({ threadId, userId }));
    }
    dispatch(toggleLikeDetailThreadActionCreator({ threadId, userId }));

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
        dispatch(toggleLikeDetailThreadActionCreator({ threadId, userId }));
        if (hasDislike) {
          dispatch(toggleDislikeDetailThreadActionCreator({ threadId, userId }));
        }
      }
    }
    dispatch(hideLoading());
  };
}

function asyncDetailToggleDislikeThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(hideLoading());
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;

    const hasDislike = threadDetail.downVotesBy.includes(userId);
    const hasLike = threadDetail.upVotesBy.includes(userId);

    if (hasLike) {
      dispatch(toggleLikeDetailThreadActionCreator({ threadId, userId }));
    }
    dispatch(toggleDislikeDetailThreadActionCreator({ threadId, userId }));

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
        dispatch(toggleDislikeDetailThreadActionCreator({ threadId, userId }));
        if (hasLike) {
          dispatch(toggleLikeDetailThreadActionCreator({ threadId, userId }));
        }
      }
    }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeComment(commentId, threadId) {
  return async (dispatch, getState) => {
    dispatch(hideLoading());
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;
    const comment = threadDetail.comments.find(
      (comment) => comment.id === commentId
    );

    const hasLike = comment.upVotesBy.includes(userId);
    const hasDislike = comment.downVotesBy.includes(userId);

    try {
      if (hasLike) {
        dispatch(toggleLikeCommentActionCreator({ commentId, userId }));
        await api.neutralVoteComment(commentId, threadId);
      } else {
        if (hasDislike) {
          dispatch(toggleDislikeCommentActionCreator({ commentId, userId }));
          await api.neutralVoteComment(commentId, threadId);
        }
        dispatch(toggleLikeCommentActionCreator({ commentId, userId }));
        await api.upVoteComment(commentId, threadId);
      }
    } catch (error) {
      alert(error.message);

      if (!hasLike) {
        dispatch(toggleLikeCommentActionCreator({ commentId, userId }));
        if (hasDislike) {
          dispatch(toggleDislikeCommentActionCreator({ commentId, userId }));
        }
      }
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDislikeComment(commentId, threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;
    const comment = threadDetail.comments.find(
      (comment) => comment.id === commentId
    );

    const hasLike = comment.upVotesBy.includes(userId);
    const hasDislike = comment.downVotesBy.includes(userId);

    try {
      if (hasDislike) {
        dispatch(toggleDislikeCommentActionCreator({ commentId, userId }));
        await api.neutralVoteComment(commentId, threadId);
      } else {
        if (hasLike) {
          dispatch(toggleLikeCommentActionCreator({ commentId, userId }));
          await api.neutralVoteComment(commentId, threadId);
        }
        dispatch(toggleDislikeCommentActionCreator({ commentId, userId }));
        await api.downVoteComment(commentId, threadId);
      }
    } catch (error) {
      alert(error.message);

      if (!hasDislike) {
        dispatch(toggleDislikeCommentActionCreator({ threadId, userId }));
        if (hasLike) {
          dispatch(toggleLikeCommentActionCreator({ threadId, userId }));
        }
      }
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  addCommentActionCreator,
  clearDetailThreadActionCreator,
  toggleLikeCommentActionCreator,
  toggleDislikeCommentActionCreator,
  asyncAddComment,
  asyncDetailToggleLikeThread,
  asyncDetailToggleDislikeThread,
  asyncReceiveDetailThread,
  asyncToggleLikeComment,
  asyncToggleDislikeComment,
};
