import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../utils/helpers';

function ThreadsHeader({ createdAt, category, owner }) {
  return (
    <div className="threads-item__header">
      <div className="threads-item__header-profile">
        <img src={owner?.avatar} alt={owner?.name} />
        <div className="threads-item__profile-info">
          <p>{owner?.name}</p>
          <span>{postedAt(createdAt)}</span>
        </div>
      </div>
      <div className="threads-item__header-category">
        <p>{category}</p>
      </div>
    </div>
  );
}

ThreadsHeader.propTypes = {
  createdAt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
};

export default ThreadsHeader;
