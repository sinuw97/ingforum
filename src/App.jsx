import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ThreadsPage from './pages/ThreadsPage';
import DetailPage from './pages/DetailPage';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import Leaderboards from './pages/LeaderboardsPage';
import Loading from './components/Loading';

function App() {
  const {
    authUser = null,
    isPreload = false
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const signOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <header className='navigation__container'>
          <Navigation authUser={authUser} signOut={signOut}/>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/addThreads' element={<ThreadsPage />} />
            <Route path='/thread/:id' element={<DetailPage />} />
            <Route path='/leaderboards' element={<Leaderboards />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;