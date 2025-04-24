import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardList({ leaderboards }) {
  return (
    <div className="leaderboard-list__container">
      {leaderboards.map((leaderboard) => (
        <div className='user-info__container' key={leaderboard.user.id}>
          <div className="user-profile">
            <img src={leaderboard.user.avatar} alt={leaderboard.user.name} />
            <h3>{leaderboard.user.name}</h3>
          </div>
          <p>{leaderboard.score}</p>
        </div>
      ))}
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string,
      }),
      score: PropTypes.number,
    })
  ).isRequired,
};

export default LeaderboardList;