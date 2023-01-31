import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton';
import SignUpForm from './SignUpForm';
import { getAllCarts } from '../../store/cart';
import './LoginForm.css'

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

  let errs;
  if (errors) {
    errs = errors.map(error =>
      error.split(':')[1]
    )
  }

  let sameErr;
  if (errs) {
    if (errs[0] === errs[1]) {
      sameErr = errs[0]
    }
  }
  console.log(errs)
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className='login-form-container'>
      <h1 className='login-header'>Sign in</h1>
    <form onSubmit={onLogin}>
      <div className='login-div'>
        {errors && !sameErr ? errors.map((error, ind) => (
          <div className='errors' key={ind}>{error.split(':')[1]}</div>
          )) :

            <div className='errors' >{sameErr}</div>

          }
      </div>
      <div className='login-div'>
        <label htmlFor='email'>Email</label>
        <input
          className='login-input'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          required={true}
          />
      </div>
      <div className='login-div'>
        <label htmlFor='password'>Password</label>
        <input
          className='login-input'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          required={true}
          />
        <button className='login-button' type='submit'>Login</button>
        <div className='login-div-bottom'>
          <button className='login-button' onClick={demoLogin}>Login as Demo user</button>
        </div>
      </div>
      <div className='login-div' id='login-modal'>
          <OpenModalButton
            buttonText='Not signed up? Create an account.'
            modalComponent={<SignUpForm />}
            className='create-account-button-on-login'
          />
        </div>
    </form>
    </div>
  );
};

export default LoginForm;
