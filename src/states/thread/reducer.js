import { ActionType } from './action';

function threadReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];
  case ActionType.RECEIVE_THREAD:
    return action.payload.threads;
  case ActionType.TOGGLE_LIKE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const isLiked = thread.upVotesBy.includes(action.payload.userId);

        const updatedThread = {
          ...thread,
          upVotesBy: isLiked
            ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
            : thread.upVotesBy.concat(action.payload.userId),
          downVotesBy: thread.downVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
        };

        return updatedThread;
      }
      return thread;
    });

  case ActionType.TOGGLE_DISLIKE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const isDisliked = thread.downVotesBy.includes(action.payload.userId);

        const updatedThread = {
          ...thread,
          downVotesBy: isDisliked
            ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
            : thread.downVotesBy.concat(action.payload.userId),
          upVotesBy: thread.upVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
        };

        return updatedThread;
      }

      return thread;
    });
  default:
    return threads;
  }
}

export default threadReducer;
