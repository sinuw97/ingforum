import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GoCommentDiscussion } from 'react-icons/go';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { IoIosLogOut } from 'react-icons/io';

import Logo from '../assets/logo.png';

function Navigation({ authUser, signOut }) {
  const { id, avatar, name } = authUser;

  return (
    <div className="navigation">
      <div className="logo-app">
        <div>
          <img src={Logo} alt="logo-app" id="logo" />
        </div>
        <p className="link-btn">Ingforum</p>
      </div>

      <div className="navbar">
        <div className="menu">
          <div>
            <GoCommentDiscussion id="react-icon" />
          </div>
          <p>
            <Link to="/" className="link-btn">Threads</Link>
          </p>
        </div>
        <div className="menu">
          <div>
            <MdOutlineLeaderboard id="react-icon" />
          </div>
          <Link to="/leaderboards" className="link-btn">Leaderboards</Link>
        </div>
        <div className="menu">
          <div>
            <IoIosLogOut id="react-icon" />
          </div>
          <button className="btn-signout" type="button" onClick={signOut}>
            <img id="avatar" src={avatar} alt={name} title={id} />
            <p id="user-name">{name}</p>
          </button>
        </div>
      </div>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
