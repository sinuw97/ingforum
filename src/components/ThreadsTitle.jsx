import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ThreadsTitle({ id, title }) {
  return (
    <h3 className="threads-item__title">
      <Link to={`/thread/${id}`}>{title}</Link>
    </h3>
  );
}

ThreadsTitle.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ThreadsTitle;
