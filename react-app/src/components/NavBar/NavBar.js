import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import OpenModalButton from '../OpenModalButton'
import SignUpForm from '../auth/SignUpForm';
import LoginForm from '../auth/LoginForm';
import cart from '../../assets/cart.png'
import home from '../../assets/home-logo.png'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const user = useSelector(state => state.session.user)
  const divRef = useRef()

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
}

export default NavBar;
