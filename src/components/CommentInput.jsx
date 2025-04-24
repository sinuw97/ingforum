import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { useParams } from 'react-router-dom';

function CommentInput({ addComment }) {
  const { id } = useParams();
  const [content, setContent] = useInput('');

  const onSubmitComment = (e) => {
    e.preventDefault();
    addComment(content, id);
  };
  return (
    <form className="input-comment" onSubmit={onSubmitComment}>
      <h3>Komentar Baru</h3>
      <textarea
        type="text"
        value={content}
        onChange={setContent}
        rows="5"
        placeholder="Berikan komentar mu..."
      />
      <button type="submit">Komen</button>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default CommentInput;
