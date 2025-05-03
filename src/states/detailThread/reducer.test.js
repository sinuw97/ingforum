/**
 * skenario testing
 *
 * - threadDetail Reducer
 *   - should return detail thread when given by RECEIVE_THREAD_DETAIL
 *   - should return null when given by CLEAR_DETAIL_THREAD
 *   - should return new comment in specific thread when given by ADD_COMMENT
 *   - should toggle like when given by TOGGLE_LIKE_DETAIL_THREAD action
 *   - should toggle like when given by TOGGLE_DISLIKE_DETAIL_THREAD action
 *   - should toggle like comment when given by TOGGLE_LIKE_COMMENT
 *   - should toggle like comment when given by TOGGLE_DISLIKE_COMMENT
 */

import threadDetailReducer from './reducer';
import { describe, it, expect } from 'vitest';

describe('threadDetail func', () => {
  it('should return detail thread when given by RECEIVE_THREAD_DETAIL', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Title test 1',
          body: 'Body test 1',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'user-1',
            name: 'john doe',
            avatar: 'john doe img'
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: []
        }
      }
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return null when given by CLEAR_DETAIL_THREAD', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Title test 1',
      body: 'Body test 1',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'user-1',
        name: 'john doe',
        avatar: 'john doe img'
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: []
    };
    const action = {
      type: 'CLEAR_DETAIL_THREAD',
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBeNull();
  });

  it('should return new comment in specific thread when given by ADD_COMMENT', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Title test 1',
      body: 'Body test 1',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'user-1',
        name: 'john doe',
        avatar: 'john doe img'
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'test comment',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'user-1',
            name: 'john doe',
            avatar: 'avatar'
          }
        }
      ]
    };
    const newComment = {
      id: 'comment-2',
      content: 'test comment-2',
      createdAt: '2021-06-21T07:00:00.000Z',
      upVotesBy: [],
      downVotesBy: [],
      owner: {
        id: 'user-1',
        name: 'john doe',
        avatar: 'avatar'
      }
    };

    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: newComment
      }
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [newComment, ...initialState.comments]
    });
  });

  it('should toggle like when given by TOGGLE_LIKE_DETAIL_THREAD action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Title test 1',
      body: 'Body test 1',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'user-1',
        name: 'john doe',
        avatar: 'john doe img'
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: []
    };
    const action = {
      type: 'TOGGLE_LIKE_DETAIL_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: ['user-2'],
      downVotesBy: [],
    });

    const nextState2 = threadDetailReducer(nextState, action);
    expect(nextState2).toEqual(initialState);
  });

  it('should toggle like when given by TOGGLE_DISLIKE_DETAIL_THREAD action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Title test 1',
      body: 'Body test 1',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'user-1',
        name: 'john doe',
        avatar: 'john doe img'
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: []
    };
    const action = {
      type: 'TOGGLE_DISLIKE_DETAIL_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: ['user-2'],
      upVotesBy: [],
    });

    const nextState2 = threadDetailReducer(nextState, action);
    expect(nextState2).toEqual(initialState);
  });

  it('should toggle like comment when given by TOGGLE_LIKE_COMMENT', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Title test 1',
      body: 'Body test 1',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'user-1',
        name: 'john doe',
        avatar: 'john doe img'
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'test comment',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'user-1',
            name: 'john doe',
            avatar: 'avatar'
          }
        }
      ]
    };
    const action = {
      type: 'TOGGLE_LIKE_COMMENT',
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'user-2',
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: ['user-2'],
          downVotesBy: []
        }
      ]
    });

    const nextState2 = threadDetailReducer(nextState, action);
    expect(nextState2).toEqual(initialState);
  });

  it('should toggle like comment when given by TOGGLE_DISLIKE_COMMENT', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Title test 1',
      body: 'Body test 1',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'user-1',
        name: 'john doe',
        avatar: 'john doe img'
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'test comment',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'user-1',
            name: 'john doe',
            avatar: 'avatar'
          }
        }
      ]
    };
    const action = {
      type: 'TOGGLE_DISLIKE_COMMENT',
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'user-2',
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          downVotesBy: ['user-2'],
          upVotesBy: []
        }
      ]
    });

    const nextState2 = threadDetailReducer(nextState, action);
    expect(nextState2).toEqual(initialState);
  });
});