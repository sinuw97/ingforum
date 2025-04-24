import React from 'react';
import SideBanner from '../components/SideBanner';
import LoginInput from '../components/LoginInput';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <div className="login-page__banner">
        <SideBanner />
      </div>
      <div className="login-page__input">
        <div className="login-page__container">
          <h2>Selamat Datang!</h2>
          <p>Login dulu gih...</p>
          <LoginInput login={onLogin} />
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
