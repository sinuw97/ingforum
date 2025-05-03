/**
 * Skenario pengujian
 *
 * - asyncAddThread thunk
 *  - should dispatch action correctly when creating thread success
 *  - should dispatch action and call alert correctly when creating thread failed
 *
 * - asyncReceiveAllThreads thunk
 *  - should dispatch action correctly when fetching threads and users success
 *  - should dispatch action and call alert correctly when fetching threads or users failed
 *
 * - asyncToggleLikeThread thunk
 *  - should dispatch action correctly when user has not liked and not disliked
 *  - should dispatch action correctly when user has already liked
 *  - should dispatch action and call alert correctly when API failed
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { asyncAddThread, asyncReceiveAllThreads, asyncToggleDislikeThread, asyncToggleLikeThread, toggleDislikeThreadActionCreator, toggleLikeThreadActionCreator } from './action';
import { addThreadActionCreator, receiveThreadActionCreator } from './action';
import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const fakeThreads = [
  {
    id: 'thread-1',
    title: 'Diskusi Seru',
    body: 'Isi diskusi...',
    category: 'umum',
    createdAt: '2023-12-01T08:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 5,
  },
];

const fakeUser = [
  {
    id: 'user-1',
    name: 'User Test',
    avatar: 'https://example.com/user-avatar'
  }
];
describe('asyncAddThread thunk func', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    delete api._createThread;
  });

  it('should dispatch action correctly when createThread is successful', async () => {
    api.createThread = () => Promise.resolve(fakeThreads);

    const dispatch = vi.fn();

    await asyncAddThread({
      title: fakeThreads.title,
      category: fakeThreads.category,
      body: fakeThreads.body,
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThreads));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alret when createThread fails', async () => {
    const fakeError = new Error('Gagal menambahkan thread');

    api.createThread = () => Promise.reject(fakeError);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncAddThread({
      title: fakeThreads.title,
      category: fakeThreads.category,
      body: fakeThreads.body,
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
});

describe('asyncReceiveAllThreads thunk func', () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
    api._getAllUsers = api.getAllUsers;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    api.getAllUsers = api._getAllUsers;
    delete api._getAllThreads;
    delete api._getAllUsers;
  });

  it('should dispatch receiveThreadsActionCreator with combined threads & users data', async () => {
    api.getAllThreads = () => Promise.resolve(fakeThreads);
    api.getAllUsers = () => Promise.resolve(fakeUser);

    const dispatch = vi.fn();

    await asyncReceiveAllThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());

    const expectedMappedThread = [
      {
        ...fakeThreads[0],
        owner: {
          id: fakeUser[0].id,
          name: fakeUser[0].name,
          avatar: fakeUser[0].avatar,
        },
      },
    ];

    expect(dispatch).toHaveBeenCalledWith(receiveThreadActionCreator(expectedMappedThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should call alert when fetching threads failed', async () => {
    const fakeError = new Error('Failed to fetch threads');
    api.getAllThreads = () => Promise.reject(fakeError);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncReceiveAllThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
});

describe('asyncToggleLikeThread thunk func', () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
    api._neutralVoteThread = api.neutralVoteThread;
    api._downVoteThread = api.downVoteThread;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;
    api.neutralVoteThread = api._neutralVoteThread;
    api.downVoteThread = api._downVoteThread;
    delete api.upVoteThread;
    delete api.neutralVoteThread;
    delete api.downVoteThread;
  });

  it('should dispatch toggleLikeThreadActionCreator and call upVoteThread when not liked/disliked', async () => {
    const fakeState = () => ({
      authUser: { id: 'user-1' },
      threads: fakeThreads,
    });

    api.upVoteThread = vi.fn(() => Promise.resolve());
    api.neutralVoteThread = vi.fn();

    const dispatch = vi.fn();

    await asyncToggleLikeThread('thread-1')(dispatch, fakeState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(toggleLikeThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should neutralize dislike and then like if previously disliked', async () => {
    const fakeDislikedThread = {
      id: 'thread-1',
      title: 'Diskusi Seru',
      body: 'Isi diskusi...',
      category: 'umum',
      createdAt: '2023-12-01T08:00:00.000Z',
      ownerId: 'user-1',
      upVotesBy: [],
      downVotesBy: ['user-1'],
      totalComments: 5,
    };

    const fakeState = () => ({
      authUser: { id: 'user-1' },
      threads: [fakeDislikedThread],
    });

    api.neutralVoteThread = vi.fn(() => Promise.resolve());
    api.upVoteThread = vi.fn(() => Promise.resolve());

    const dispatch = vi.fn();

    await asyncToggleLikeThread('thread-1')(dispatch, fakeState);
    expect(dispatch).toHaveBeenCalledWith(toggleDislikeThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(dispatch).toHaveBeenCalledWith(toggleLikeThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(api.neutralVoteThread).toHaveBeenCalledWith('thread-1');
    expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
  });

  it('should neutralize like if already liked', async () => {
    const fakeLikedThread = {
      id: 'thread-1',
      title: 'Diskusi Seru',
      body: 'Isi diskusi...',
      category: 'umum',
      createdAt: '2023-12-01T08:00:00.000Z',
      ownerId: 'user-1',
      upVotesBy: ['user-1'],
      downVotesBy: [],
      totalComments: 5,
    };

    const fakeState = () => ({
      authUser: { id: 'user-1' },
      threads: [fakeLikedThread],
    });

    api.neutralVoteThread = vi.fn(() => Promise.resolve());

    const dispatch = vi.fn();

    await asyncToggleLikeThread('thread-1')(dispatch, fakeState);
    expect(api.neutralVoteThread).toHaveBeenCalledWith('thread-1');
  });

  it('should rollback toggleLikeThreadActionCreator when API fails', async () => {
    const fakeError = new Error('Failed to like the thread');

    const fakeState = () => ({
      authUser: { id: 'user-1' },
      threads: fakeThreads,
    });

    api.upVoteThread = vi.fn(() => Promise.reject(fakeError));
    window.alert = vi.fn();

    const dispatch = vi.fn();

    await asyncToggleLikeThread('thread-1')(dispatch, fakeState);

    expect(dispatch).toHaveBeenCalledWith(toggleLikeThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(dispatch).toHaveBeenCalledWith(toggleLikeThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
});

describe('asyncToggleDislikeThread thunk func', () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
    api._neutralVoteThread = api.neutralVoteThread;
    api._downVoteThread = api.downVoteThread;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;
    api.neutralVoteThread = api._neutralVoteThread;
    api.downVoteThread = api._downVoteThread;
    delete api.upVoteThread;
    delete api.neutralVoteThread;
    delete api.downVoteThread;
  });

  it('should dispatch toggleDislikeThreadActionCreator and call downVoteThread when not liked/disliked', async () => {
    const fakeState = () => ({
      authUser: { id: 'user-1' },
      threads: fakeThreads,
    });

    api.downVoteThread = vi.fn(() => Promise.resolve());
    api.neutralVoteThread = vi.fn();

    const dispatch = vi.fn();

    await asyncToggleDislikeThread('thread-1')(dispatch, fakeState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(toggleDislikeThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(api.downVoteThread).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should neutralize like and then dislike if previously liked', async () => {
    const fakeLikedThread = {
      id: 'thread-1',
      title: 'Diskusi Seru',
      body: 'Isi diskusi...',
      category: 'umum',
      createdAt: '2023-12-01T08:00:00.000Z',
      ownerId: 'user-1',
      upVotesBy: ['user-1'],
      downVotesBy: [],
      totalComments: 5,
    };

    const fakeState = () => ({
      authUser: { id: 'user-1' },
      threads: [fakeLikedThread],
    });

    api.neutralVoteThread = vi.fn(() => Promise.resolve());
    api.downVoteThread = vi.fn(() => Promise.resolve());

    const dispatch = vi.fn();

    await asyncToggleDislikeThread('thread-1')(dispatch, fakeState);
    expect(dispatch).toHaveBeenCalledWith(toggleLikeThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(dispatch).toHaveBeenCalledWith(toggleDislikeThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(api.neutralVoteThread).toHaveBeenCalledWith('thread-1');
    expect(api.downVoteThread).toHaveBeenCalledWith('thread-1');
  });

  it('should neutralize dislike if already disliked', async () => {
    const fakeDislikedThread = {
      id: 'thread-1',
      title: 'Diskusi Seru',
      body: 'Isi diskusi...',
      category: 'umum',
      createdAt: '2023-12-01T08:00:00.000Z',
      ownerId: 'user-1',
      upVotesBy: [],
      downVotesBy: ['user-1'],
      totalComments: 5,
    };

    const fakeState = () => ({
      authUser: { id: 'user-1' },
      threads: [fakeDislikedThread],
    });

    api.neutralVoteThread = vi.fn(() => Promise.resolve());

    const dispatch = vi.fn();

    await asyncToggleDislikeThread('thread-1')(dispatch, fakeState);
    expect(api.neutralVoteThread).toHaveBeenCalledWith('thread-1');
  });

  it('should rollback toggleLikeThreadActionCreator when API fails', async () => {
    const fakeError = new Error('Failed to like the thread');

    const fakeState = () => ({
      authUser: { id: 'user-1' },
      threads: fakeThreads,
    });

    api.downVoteThread = vi.fn(() => Promise.reject(fakeError));
    window.alert = vi.fn();

    const dispatch = vi.fn();

    await asyncToggleDislikeThread('thread-1')(dispatch, fakeState);

    expect(dispatch).toHaveBeenCalledWith(toggleDislikeThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(dispatch).toHaveBeenCalledWith(toggleDislikeThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }));
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
});