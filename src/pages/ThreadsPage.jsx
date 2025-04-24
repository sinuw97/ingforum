import React from 'react';
import BackButton from '../components/BackButton';
import ThreadsInput from '../components/ThreadsInput';
import { useDispatch } from 'react-redux';
import { asyncAddThread } from '../states/thread/action';
import { useNavigate } from 'react-router-dom';

function ThreadsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body })).then(() => {
      navigate('/');
    });
  };
  return (
    <section className="threads-input-page">
      <div className="threads-input-page__container">
        <div className="threads-input-page__main">
          <BackButton />
          <h2>Tambah thread baru</h2>
          <ThreadsInput addThread={onAddThread} />
        </div>
      </div>
    </section>
  );
}

export default ThreadsPage;
