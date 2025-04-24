import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ThreadsDetail from '../components/ThreadsDetail';
import CommentList from '../components/CommentList';
import CommentInput from '../components/CommentInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncAddComment,
  asyncDetailToggleDislikeThread,
  asyncDetailToggleLikeThread,
  asyncReceiveDetailThread,
  asyncToggleDislikeComment,
  asyncToggleLikeComment,
} from '../states/detailThread/action';
import { formattedToggleNumber } from '../utils/helpers';

function DetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const authUser = useSelector((state) => state.authUser);
  const threadDetail = useSelector((state) => state.threadDetail);

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));
  }, [id, dispatch]);

  const onSubmitComment = (content, threadId) => {
    dispatch(asyncAddComment(content, threadId));
  };

  const handleLike = (threadId) => {
    dispatch(asyncDetailToggleLikeThread(threadId));
  };

  const handleDislike = (threadId) => {
    dispatch(asyncDetailToggleDislikeThread(threadId));
  };

  const handlerLikeComment = (commentId, threadId) => {
    dispatch(asyncToggleLikeComment(commentId, threadId));
  };

  const handlerDislikeComment = (commentId, threadId) => {
    dispatch(asyncToggleDislikeComment(commentId, threadId));
  };

  if (!threadDetail) {
    return <p>Thread yang dimaksud tidak tersedia</p>;
  }
  return (
    <section className="detail-page">
      <div className="thread-detail__container">
        <ThreadsDetail
          authUserId={authUser.id}
          thread={threadDetail}
          like={handleLike}
          dislike={handleDislike}
        />
        <div className="comment-list__container">
          <h3>
            Komentar {formattedToggleNumber(threadDetail.comments.length)}
          </h3>
          <CommentList
            threadId={threadDetail.id}
            comments={threadDetail.comments}
            authUser={authUser}
            like={handlerLikeComment}
            dislike={handlerDislikeComment}
          />
        </div>
        <div className="comment-input__container">
          <CommentInput addComment={onSubmitComment} />
        </div>
      </div>
    </section>
  );
}

export default DetailPage;
