/**
 * skenario testing
 *
 * - thread Reducer
 *   - should return initial state when given by unknown action
 *   - should return the thread when given by RECEIVE_THREAD action
 *   - should return thread with new thread when given by ADD_THREAD action
 *   - should toggle like when given by TOGGLE_LIKE_THREAD action
 *   - should toggle like when given by TOGGLE_DISLIKE_THREAD action
 */

import threadReducer from './reducer';
import { describe, it, expect } from 'vitest';

describe('threadReducer func', () => {
  it('should return initial state when given by unknown action', () => {
    //arrange
    const initialState = null;
    const action = {
      type: 'UNKNOWN',
    };

    //action
    const nextState = threadReducer(initialState, action);

    //assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread when given by RECEIVE_THREAD action', () => {
    //arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREAD',
      payload: {
        threads: [
          {
            id: 'thread-01',
            title: 'Title test 1',
            body: 'Body test 1',
            category: 'test',
            createdAt: '2021-06-21T07:00:00.000Z',
            upVotesBy: [],
            downVotesBy: [],
            ownerId: 'test-user-1',
            totalComments: 0
          },
          {
            id: 'thread-02',
            title: 'Title test 2',
            body: 'Body test 2',
            category: 'test',
            createdAt: '2021-06-21T07:00:00.000Z',
            upVotesBy: [],
            downVotesBy: [],
            ownerId: 'test-user-2',
            totalComments: 0
          },
        ]
      }
    };

    //action
    const nextState = threadReducer(initialState, action);

    //assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return thread with new thread when given by ADD_THREAD action', () => {
    //arrange
    const initialState = [
      {
        id: 'thread-01',
        title: 'Title test 1',
        body: 'Body test 1',
        category: 'test',
        createdAt: '2021-06-21T07:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
        ownerId: 'test-user-1',
        totalComments: 0
      }
    ];
    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: [
          {
            id: 'thread-02',
            title: 'Title test 2',
            body: 'Body test 2',
            category: 'test',
            createdAt: '2021-06-21T07:00:00.000Z',
            upVotesBy: [],
            downVotesBy: [],
            ownerId: 'test-user-2',
            totalComments: 0
          }
        ]
      }
    };

    //action
    const nextState = threadReducer(initialState, action);

    //assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should toggle like when given by TOGGLE_LIKE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-01',
        title: 'Title test 1',
        body: 'Body test 1',
        category: 'test',
        createdAt: '2021-06-21T07:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
        ownerId: 'test-user-1',
        totalComments: 0
      }
    ];
    const action = {
      type: 'TOGGLE_LIKE_THREAD',
      payload: {
        threadId: 'thread-01',
        userId: 'user-2',
      },
    };

    const nextState = threadReducer(initialState, action);
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: ['user-2'],
        downVotesBy: [],
      },
    ]);

    const nextState2 = threadReducer(nextState, action);
    expect(nextState2).toEqual(initialState);
  });

  it('should toggle like when given by TOGGLE_DISLIKE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-01',
        title: 'Title test 1',
        body: 'Body test 1',
        category: 'test',
        createdAt: '2021-06-21T07:00:00.000Z',
        upVotesBy: [],
        downVotesBy: [],
        ownerId: 'test-user-1',
        totalComments: 0
      }
    ];
    const action = {
      type: 'TOGGLE_DISLIKE_THREAD',
      payload: {
        threadId: 'thread-01',
        userId: 'user-2',
      },
    };

    const nextState = threadReducer(initialState, action);
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: ['user-2'],
        upVotesBy: [],
      },
    ]);

    const nextState2 = threadReducer(nextState, action);
    expect(nextState2).toEqual(initialState);
  });
});