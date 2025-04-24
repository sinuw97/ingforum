const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function getAccessToken() {
    const token = localStorage.getItem('authToken');
    return token;
  }

  function setAccessToken(token) {
    localStorage.setItem('authToken', token);
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;

    return user;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { token } } = responseJson;
    setAccessToken(token);

    return token;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;
    return user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { users } } = responseJson;
    return users;
  }

  async function createThread({ title, body, category }) {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          category,
          body
        }),
      });

      const responseJson = await response.json();

      const { status, message, data: { thread } } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return thread;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getAllThreads() {
    try {
      const response = await fetch(`${BASE_URL}/threads`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseJson = await response.json();

      const { status, message, data: { threads } } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return threads;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getDetailThread(threadId) {
    try {
      const response = await fetch(`${BASE_URL}/threads/${threadId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseJson = await response.json();

      const { status, message, data: { detailThread } } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return detailThread;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function upVoteThread(threadId) {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const responseJson = await response.json();
      const { status, message, data: { vote } } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return vote;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function downVoteThread(threadId) {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const responseJson = await response.json();
      const { status, message, data: { vote } } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return vote;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function neutralVoteThread(threadId) {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const responseJson = await response.json();
      const { status, message, data: { vote } } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return vote;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function createComment(content, threadId) {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content
        }),
      });

      const responseJson = await response.json();
      const { status, message, data: { comment } } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function upVoteComment(commentId, threadId) {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const responseJson = await response.json();
      const { status, message, data: { vote } } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return vote;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function downVoteComment(commentId, threadId) {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const responseJson = await response.json();
      const { status, message, data: { vote } } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return vote;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function neutralVoteComment(commentId, threadId) {
    try {
      const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const responseJson = await response.json();
      const { status, message, data: { vote } } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return vote;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getAllLeaderboards() {
    try {
      const response = await fetch(`${BASE_URL}/leaderboards`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseJson = await response.json();
      const { status, message, data: { leaderboards } } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return leaderboards;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    getAccessToken,
    setAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    createThread,
    getAllThreads,
    getDetailThread,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    createComment,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
    getAllLeaderboards,
  };
})();

export default api;