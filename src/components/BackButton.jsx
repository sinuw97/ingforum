import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

function BackButton() {
  return (
    <div className="back-btn">
      <button>
        <Link to={'/'}>
          <IoIosArrowBack />
        </Link>
      </button>
    </div>
  );
}

export default BackButton;
