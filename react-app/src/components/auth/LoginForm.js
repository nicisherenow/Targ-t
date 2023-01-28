import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton';
import SignUpForm from './SignUpForm';
import { getAllCarts } from '../../store/cart';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { closeModal } = useModal()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    await dispatch(getAllCarts())
    if (data) {
      setErrors(data);
    } else {
      await closeModal()
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('rambo@aa.io', 'password'))
    await dispatch(getAllCarts())
    if (data) {
      setErrors(data)
    } else {
      await closeModal()
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
    <form onSubmit={onLogin}>
      <div>
          <OpenModalButton
            buttonText='Not signed up? Create an account.'
            modalComponent={<SignUpForm />}
            className='create-account-button-on-login'
          />
        </div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
          ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          required={true}
          />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          required={true}
          />
        <button type='submit'>Login</button>
        <div className='issaDemo'>
          <button onClick={demoLogin}>Login as Demo user</button>
        </div>
      </div>
    </form>
    </>
  );
};

export default LoginForm;
