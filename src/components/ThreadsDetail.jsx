import React from 'react';
import PropTypes from 'prop-types';
import ThreadsTitle from './ThreadsTitle';
import ThreadsHeader from './ThreadsHeader';
import ThreadsBody from './ThreadsBody';
import BackButton from './BackButton';
import VoteToggle from './VoteToggle';
import { FaRegComments } from 'react-icons/fa';

function ThreadsDetail({
  authUserId,
  thread,
  like,
  dislike,
}) {
  const isUpVoted = thread.upVotesBy?.includes(authUserId);
  const isDownVoted = thread.downVotesBy?.includes(authUserId);
  return (
    <>
      <BackButton />
      <div className="thread-detail__content">
        <ThreadsHeader
          owner={thread.owner}
          createdAt={thread.createdAt}
          category={thread.category}
        />
        <ThreadsTitle id={thread.id} title={thread.title} />
        <ThreadsBody body={thread.body} />
        <div className="threads-toggle">
          <VoteToggle
            id={thread.id}
            upVotesCount={thread.upVotesBy.length}
            downVotesCount={thread.downVotesBy.length}
            isUpvoted={isUpVoted}
            isDownvoted={isDownVoted}
            like={like}
            dislike={dislike}
          />
          <div className="threads-toggle__box">
            <FaRegComments />
            <p>{thread.comments.length}</p>
          </div>
        </div>
      </div>
    </>
  );
}

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const threadsShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
};

ThreadsDetail.propTypes = {
  authUserId: PropTypes.string.isRequired,
  thread: PropTypes.shape(threadsShape).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export default ThreadsDetail;
