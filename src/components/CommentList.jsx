import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentList({ threadId, comments, authUser, like, dislike }) {

  useEffect(() => {
    console.log('Re-rendering CommentList', comments);
  }, [comments]);

  return (
    <>
      {comments.map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            authUserId={authUser.id}
            comment={comment}
            like={() => like(comment.id, threadId)}
            dislike={() => dislike(comment.id, threadId)}
          />
        );
      })}
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

CommentList.propTypes = {
  threadId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export default CommentList;
