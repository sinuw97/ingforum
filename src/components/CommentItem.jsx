import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../utils/helpers';
import parser from 'html-react-parser';
import VoteToggle from './VoteToggle';

function CommentItem({
  authUserId,
  comment,
  like,
  dislike,
}) {

  const isUpVoted = comment.upVotesBy.includes(authUserId);
  const isDownVoted = comment.downVotesBy.includes(authUserId);

  return (
    <>
      <div key={comment.id} className="comment-item__container">
        <div className="comment-item__wrapper-profile">
          <div className="comment-item__profile">
            <img src={comment.owner.avatar} alt={comment.owner.name} />
            <p>{comment.owner.name}</p>
          </div>
          <div className="comment-item__posted">
            <p>{postedAt(comment.createdAt)}</p>
          </div>
        </div>
        <div className="comment-item__content">
          <p>{parser(comment.content)}</p>
        </div>
        <div className="comment-toggle">
          <VoteToggle
            id={comment.id}
            upVotesCount={comment.upVotesBy.length}
            downVotesCount={comment.downVotesBy.length}
            isUpvoted={isUpVoted}
            isDownvoted={isDownVoted}
            like={like}
            dislike={dislike}
          />
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

CommentItem.propTypes = {
  authUserId: PropTypes.string.isRequired,
  comment: PropTypes.shape(commentShape).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export default CommentItem;