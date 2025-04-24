import React from 'react';
import PropTypes from 'prop-types';
import ThreadsTitle from './ThreadsTitle';
import ThreadsHeader from './ThreadsHeader';
import ThreadsBody from './ThreadsBody';
import VoteToggle from './VoteToggle';
import { FaRegComments } from 'react-icons/fa';
import { formattedToggleNumber } from '../utils/helpers';

function ThreadsItem({
  id,
  title,
  body,
  totalComments,
  createdAt,
  category,
  owner,
  upVotesBy = [],
  downVotesBy = [],
  like,
  dislike,
  isUpVoted,
  isDownVoted,
}) {
  return (
    <div className="threads-item__container">
      <ThreadsTitle id={id} title={title} />
      <ThreadsHeader owner={owner} createdAt={createdAt} category={category} />
      <ThreadsBody body={body} />
      <div className="threads-toggle">
        <VoteToggle
          id={id}
          upVotesCount={upVotesBy.length}
          downVotesCount={downVotesBy.length}
          isUpvoted={isUpVoted}
          isDownvoted={isDownVoted}
          like={like}
          dislike={dislike}
        />
        <div className="threads-toggle__box">
          <FaRegComments />
          <p>{formattedToggleNumber(totalComments)}</p>
        </div>
      </div>
    </div>
  );
}

ThreadsItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  totalComments: PropTypes.number,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  isUpVoted: PropTypes.bool.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
};

export default ThreadsItem;
