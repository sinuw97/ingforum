import React from 'react';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput.js';
import PropTypes from 'prop-types';
;
function RegisterInput({ register }) {
  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const onSubmitRegister = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form className="register-input" onSubmit={onSubmitRegister}>
      <input
        type="text"
        value={name}
        onChange={setName}
        placeholder="Isi nama mu"
      />
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
      <div className="register-input__btn-wrapper">
        <button type="submit">Register</button>
        <span>
          Balik ke{' '}
          <Link to={'/'}>
            <strong>Login</strong>
          </Link>
        </span>
      </div>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
