import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadsInputButton from '../components/ThreadsInputButton';
import CategoriesSection from '../components/CategoriesSection';
import ThreadList from '../components/ThreadsList';
import { asyncReceiveAllThreads } from '../states/thread/action';
import {
  asyncToggleLikeThread,
  asyncToggleDislikeThread,
} from '../states/thread/action';

function HomePage() {
  const { threads, authUser } = useSelector((state) => state);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveAllThreads());
  }, [dispatch]);

  const handleLike = (threadId) => {
    dispatch(asyncToggleLikeThread(threadId));
  };

  const handleDislike = (threadId) => {
    dispatch(asyncToggleDislikeThread(threadId));
  };

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category.toLowerCase() === selectedCategory.toLowerCase())
    : threads;

  return (
    <section className="home-page">
      <div className="home-page__container">
        <ThreadsInputButton />
        <CategoriesSection
          selectedCategory={selectedCategory}
          onCategoryClick={setSelectedCategory}
        />
        <ThreadList threads={filteredThreads} authUser={authUser} like={handleLike} dislike={handleDislike} />
      </div>
    </section>
  );
}

export default HomePage;
