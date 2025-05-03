/**
 * skenario testing
 *
 * - authUser Reducer
 *   - should return the initial state when given by unknown action
 *   - should return the authUser when given by SET_AUTH_USER action
 *   - should return null when given by UNSET_AUTH_USER action
 */

import authUserReducer from './reducer';
import { describe, it, expect } from 'vitest';

describe('authUserReducer func', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'UNKNOWN'
    };

    //action
    const nextState = authUserReducer(initialState, action);

    //assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser when given by SET_AUTH_USER action', () => {
    //arrange
    const initialState = null;
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: {
          token: 'tokenabcd123',
          id: 'user-01',
          name: 'Lorem Ipsum'
        }
      }
    };

    //action
    const nextState = authUserReducer(initialState, action);

    //assert
    expect(nextState).toEqual({ token: 'tokenabcd123', id: 'user-01', name: 'Lorem Ipsum' });
  });

  it('should return null when given by UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = {
      token: 'abc123token'
    };
    const action = {
      type: 'UNSET_AUTH_USER'
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });
});