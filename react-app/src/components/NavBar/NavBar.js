import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import OpenModalButton from '../OpenModalButton'
import SignUpForm from '../auth/SignUpForm';
import LoginForm from '../auth/LoginForm';
import cart from '../../assets/cart.png'
import home from '../../assets/home-logo.png'
import { getAllCarts } from '../../store/cart';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const user = useSelector(state => state.session.user)
  const divRef = useRef()
  const dispatch = useDispatch()
  const carts = useSelector(state => state.carts)

  useEffect(() => {
    dispatch(getAllCarts())
    .then(() => setLoaded(true))
  },[dispatch])

  let cartsList;
  let total = 0
  if (carts) {
    cartsList = Object.values(carts)
    cartsList.forEach(cart =>
      total += cart.quantity
    );
  }

  useEffect(() => {
    if (!isOpen) return;

    const closeMenu = (e) => {
      if (!divRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [isOpen]);

  if (!loaded) return null

  if (!carts) {

    return (
      <nav className='navbar-container'>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src={home} alt='home-icon' id='home' className='cart-icon-size' />
          </NavLink>
        </div>
        <div className={`dropdown-container ${isOpen ? 'open' : ''}`} ref={divRef}>
      <div className='right-side-container'>
      <button onClick={() => setIsOpen(!isOpen)}>
        {user ? `Hi, ${user.firstName}` : 'Sign In'}
      </button>
      { !user ?
      <div className="dropdown-menu">
        <div>
          <OpenModalButton
            buttonText='Sign in'
            modalComponent={<LoginForm />}
            className='sign-in-button'
            />
          </div>
        <div>
          <OpenModalButton
            buttonText='Create Account'
            modalComponent={<SignUpForm />}
            className='create-account-button'
            />
          </div>
        </div>
          :
        <div className="dropdown-menu">
          <div>
            {`Hello, ${user.firstName}`}
          </div>
          <div>
            <LogoutButton />
          </div>
      </div>
      }
      </div>
        <NavLink to='/cart'>
          <img src={cart} alt='cart-icon' className='cart-icon-size' />
        </NavLink>
      </div>
    </nav>
  );
} else {
  return (
    <nav className='navbar-container'>
      <div>
        <NavLink to='/' exact={true} activeClassName='active'>
          <img src={home} alt='home-icon' id='home' className='cart-icon-size' />
        </NavLink>
      </div>
      <div className={`dropdown-container ${isOpen ? 'open' : ''}`} ref={divRef}>
    <div id='right-side-container'>
    <button onClick={() => setIsOpen(!isOpen)} id={`${isOpen ? 'open' : ''}`}>
      {user ? `Hi, ${user.firstName}` : 'Sign In'}
    </button>
    { !user ?
    <div className="dropdown-menu">
      <div className='menu-buttons'>
        <OpenModalButton
          buttonText='Sign in'
          modalComponent={<LoginForm />}
          className='sign-in-button'
          />
        </div>
      <div className='menu-buttons'>
        <OpenModalButton
          buttonText='Create Account'
          modalComponent={<SignUpForm />}
          className='create-account-button'
          />
        </div>
      </div>
        :
      <div className="dropdown-menu">
        <div>
          {`Hello, ${user.firstName}`}
        </div>
        <div className='menu-buttons'>
          <LogoutButton />
        </div>
    </div>
    }
    </div>
      <NavLink to='/cart' className='cart-icon-container'>
        {total ?
        <span className='cart-total'>{total}</span>
        : null }
        <img src={cart} alt='cart-icon' className='cart-icon-size' />
      </NavLink>
    </div>
  </nav>
  )
}
}

export default NavBar;
