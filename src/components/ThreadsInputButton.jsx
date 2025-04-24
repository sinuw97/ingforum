import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

function ThreadsInputButton() {
  const navigate = useNavigate();

  const addThreadHandle = () => {
    navigate('/addThreads');
  };

  return (
    <>
      <div className="threads-btn__container">
        <div className="threads-btn__main">
          <h4>Buat threads baru...</h4>
          <button type="button" className="threads-btn" onClick={addThreadHandle}>
            <FaPlus />
          </button>
        </div>
      </div>
    </>
  );
}

export default ThreadsInputButton;
