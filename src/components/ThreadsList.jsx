import React from 'react';
import PropTypes from 'prop-types';
import ThreadsItem from './ThreadsItem';

function ThreadList({ threads, authUser, like, dislike }) {
  return (
    <div className="threads-list__container">
      {threads.map((thread) => {
        const isUpVoted = thread.upVotesBy?.includes(authUser.id);
        const isDownVoted = thread.downVotesBy?.includes(authUser.id);

        return (
          <ThreadsItem
            key={thread.id}
            {...thread}
            like={like}
            dislike={dislike}
            isUpVoted={isUpVoted}
            isDownVoted={isDownVoted}
          />
        );
      })}
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number,
};

ThreadList.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  threads: PropTypes.arrayOf(PropTypes.shape(threadShape)).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export default ThreadList;
