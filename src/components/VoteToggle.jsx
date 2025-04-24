import React from 'react';
import PropTypes from 'prop-types';
import { BiSolidUpvote, BiSolidDownvote } from 'react-icons/bi';
import { formattedToggleNumber } from '../utils/helpers';

function VoteToggle({
  id,
  upVotesCount,
  downVotesCount,
  isUpvoted,
  isDownvoted,
  like,
  dislike,
}) {
  const onLikeClicked = (e) => {
    e.stopPropagation();
    like(id);
  };

  const onDislikeClicked = (e) => {
    e.stopPropagation();
    dislike(id);
  };

  console.log({ id, isUpvoted, isDownvoted });
  return (
    <>
      <div className="threads-toggle__box">
        <button type="button" onClick={onLikeClicked}>
          <BiSolidUpvote className={`upvote-btn ${isUpvoted ? 'active' : ''}`} />
        </button>
        <p>{formattedToggleNumber(upVotesCount)}</p>
      </div>
      <div className="threads-toggle__box">
        <button type="button" onClick={onDislikeClicked}>
          <BiSolidDownvote
            className={`downvote-btn ${isDownvoted ? 'active' : ''}`}
          />
        </button>
        <p>{formattedToggleNumber(downVotesCount)}</p>
      </div>
    </>
  );
}

VoteToggle.propTypes = {
  id: PropTypes.string.isRequired,
  upVotesCount: PropTypes.number.isRequired,
  downVotesCount: PropTypes.number.isRequired,
  isUpvoted: PropTypes.bool.isRequired,
  isDownvoted: PropTypes.bool.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export default VoteToggle;
