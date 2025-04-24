import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { wordsLimit } from '../utils/helpers';

function ThreadsBody({ body }) {
  return (
    <div className="threads-item__body">
      <div className="threads-item__body-container">
        <div>{parser(wordsLimit(body))}</div>
      </div>
    </div>
  );
}

ThreadsBody.propTypes = {
  body: PropTypes.string.isRequired
};

export default ThreadsBody;
