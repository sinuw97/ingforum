import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardList from '../components/LeaderboardList';
import { asyncReceiveLeaderboards } from '../states/leaderboardUser/action';

function LeaderboardsPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section className="leaderboard-page">
      <div className="leaderboard-page__container">
        <h1>Leaderboard </h1>
        <p>Cek peringkat lu disini</p>
        <LeaderboardList leaderboards={leaderboards} />
      </div>
    </section>
  );
}

export default LeaderboardsPage;