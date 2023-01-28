import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/cart';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clearCart())
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
