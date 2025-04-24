import React from 'react';
import SideBanner from '../components/SideBanner';
import RegisterInput from '../components/RegisterInput';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <section className="register-page">
      <div className="register-page__banner">
        <SideBanner />
      </div>
      <div className="register-page__input">
        <div className="register-page__container">
          <h2>Buat akun lu sekarang</h2>
          <p>Jangan aneh aneh ya ngisinya...</p>
          <RegisterInput register={onRegister}/>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;