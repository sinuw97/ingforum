import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_DETAIL_THREAD:
    return null;
  case ActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };
  case ActionType.TOGGLE_LIKE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) return { ...comment };

        const upVotesBy = comment.upVotesBy.includes(action.payload.userId)
          ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
          : [...comment.upVotesBy, action.payload.userId];

        const downVotesBy = comment.downVotesBy.includes(action.payload.userId)
          ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
          : comment.downVotesBy;

        return {
          ...comment,
          upVotesBy,
          downVotesBy,
        };

      }),
    };
  case ActionType.TOGGLE_DISLIKE_COMMENT:{
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) return { ...comment };

        const downVotesBy = comment.downVotesBy.includes(action.payload.userId)
          ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
          : [...comment.downVotesBy, action.payload.userId];

        const upVotesBy = comment.upVotesBy.includes(action.payload.userId)
          ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
          : comment.upVotesBy;

        return {
          ...comment,
          upVotesBy,
          downVotesBy,
        };
      }),
    };
  }
  case ActionType.TOGGLE_LIKE_DETAIL_THREAD: {
    const { userId } = action.payload;
    const isLiked = threadDetail.upVotesBy.includes(userId);

    const updatedThreadDetail = {
      ...threadDetail,
      upVotesBy: isLiked
        ? threadDetail.upVotesBy.filter((id) => id !== userId)
        : threadDetail.upVotesBy.concat(userId),
      downVotesBy: threadDetail.downVotesBy.filter(
        (id) => id !== userId
      ),
    };

    return updatedThreadDetail;
  }
  case ActionType.TOGGLE_DISLIKE_DETAIL_THREAD: {
    const { userId } = action.payload;
    const isDisliked = threadDetail.downVotesBy.includes(userId);

    const updatedThread = {
      ...threadDetail,
      downVotesBy: isDisliked
        ? threadDetail.downVotesBy.filter((id) => id !== userId)
        : threadDetail.downVotesBy.concat(userId),
      upVotesBy: threadDetail.upVotesBy.filter(
        (id) => id !== userId
      ),
    };

    return updatedThread;
  }
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
