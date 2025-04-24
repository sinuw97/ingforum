import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput.js';

function LoginInput({ login }) {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const onSubmitLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form className="login-input" onSubmit={onSubmitLogin}>
      <input
        type="text"
        value={email}
        onChange={setEmail}
        placeholder="Isi email mu"
      />
      <input
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Isi paswordmu"
      />
      <div className="login-input__btn-wrapper">
        <button type="submit">
          Login
        </button>
        <span>
          Gak punya akun?{' '}
          <Link to={'/register'}>
            <strong>Register dulu</strong>
          </Link>
        </span>
      </div>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
