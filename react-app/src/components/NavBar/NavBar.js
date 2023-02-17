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
import github from '../../assets/github.png'
import linkedin from '../../assets/linkedin.png'
import { getAllCarts } from '../../store/cart';
import { getAllItems } from '../../store/item';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isTechOpen, setIsTechOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const user = useSelector(state => state.session.user)
  const divRef = useRef()
  const techRef = useRef()
  const searchRef = useRef()
  const dispatch = useDispatch()
  const carts = useSelector(state => state.carts)
  const items = useSelector(state => state.items)

  useEffect(() => {
    dispatch(getAllItems())
    if (user) {
      dispatch(getAllCarts())
    }
    setLoaded(true)
  },[dispatch, user])

  let cartsList;
  let total = 0
  if (carts) {
    cartsList = Object.values(carts)
    cartsList.forEach(cart =>
      total += cart.quantity
    );
  }

  let itemsList;
  if (items) {
    itemsList = Object.values(items)
  }

  const updateSearchText = (e) => {
    e.preventDefault()
    setSearchText(e.target.value)
  }

  useEffect(() => {
  const searchData = (itemsList, searchText) => {
      const results = [];
      itemsList.forEach(item => {
        if (item.name.toLowerCase().includes(searchText.toLowerCase()) || item.category.toLowerCase().includes(searchText.toLowerCase())) {
          results.push(item);
        }
      });
      setSearchResults(results);
  };
  searchData(itemsList, searchText.length === 0 ? '' : searchText)
  // eslint-disable-next-line
  }, [searchText])

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

  useEffect(() => {
    if (!isSearchOpen) return;

    const closeMenu = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
        setSearchText('')
        setSearchResults([])
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isTechOpen) return;

    const closeMenu = (e) => {
      if (!techRef.current.contains(e.target)) {
        setIsTechOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [isTechOpen]);

  if (!loaded) return null

  if (!carts) {

    return (
      <nav className='navbar-container'>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src={home} alt='home-icon' id='home' className='cart-icon-size' />
          </NavLink>
        </div>
        <div className='nav-search'>
            <input
              placeholder='Search'
              name='search'
              type='text'
              className='search-input'
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              ref={searchRef}
              onChange={updateSearchText}
              value={searchText}
              />
              <div className={`search-results`} id={isSearchOpen ? '' : 'open'}>
              {searchResults.length > 0 ?
              searchResults.map(result => (
                <div className='result-container'>
                <NavLink className='result-container' to={`/items/${result.id}`}>
                  <div className='search-image-container'>
                    <img className='search-image' src={result.imageUrl} alt={result.name} />
                  </div>
                  <div className='search-result-details'>
                    <span>{result.name}</span>
                    <span>${result.price}</span>
                  </div>
                </NavLink>
                </div>
              )) : null}
                </div>
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
      <div className='nav-search'>
            <input
              placeholder='Search'
              name='search'
              type='text'
              className='search-input'
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              ref={searchRef}
              onChange={updateSearchText}
              value={searchText}
              />
              <div className={`search-results`} id={isSearchOpen ? '' : 'open'}>
              {searchResults.length > 0 ?
              searchResults.map(result => (
                <div className='result-container'>
                <NavLink className='result-container' to={`/items/${result.id}`}>
                  <div className='search-image-container'>
                    <img className='search-image' src={result.imageUrl} alt={result.name} />
                  </div>
                  <div className='search-result-details'>
                    <span>{result.name}</span>
                    <span>${result.price}</span>
                  </div>
                </NavLink>
                </div>
              )) : null}
                </div>
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
      <div className='dev-links'>
        <a href='https://github.com/nicisherenow' className="git-links" target='_blank' rel="noreferrer"><img src={github} alt='github' className='link-size' id='github' /></a>
        <a href='https://www.linkedin.com/in/nicholas-talbot-5441a4242/' className="linkedin-links" target='_blank' rel="noreferrer"><img src={linkedin} alt='linkedin' className='link-size' id='linkedin' /></a>
      </div>
      <div className='tech-drop' ref={techRef}>
          <button className='tech-drop-button' onClick={() => setIsTechOpen(!isTechOpen)} id={`${isTechOpen ? 'open' : ''}`}>Tech stack:</button>
          <ul id={`${isTechOpen ? '' : 'open'}`}>
            Tech Stack:
            <li>SQLalchemy</li>
            <li>Alembic</li>
            <li>Python 3</li>
            <li>Html/CSS</li>
            <li>Flask</li>
            <li>React</li>
            <li>Redux</li>
            <li>PostgreSQL</li>
            <li>Node.js</li>
            <li>JSX</li>
            <li>Javascript</li>
            <li>SQLite3</li>
          </ul>
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
        <div className='dev-links'>
          <a href='https://github.com/nicisherenow' className="git-links" target='_blank' rel="noreferrer"><img src={github} alt='github' className='link-size' id='github' /></a>
          <a href='https://www.linkedin.com/in/nicholas-talbot-5441a4242/' className="linkedin-links" target='_blank' rel="noreferrer"><img src={linkedin} alt='linkedin' className='link-size' id='linkedin' /></a>
        </div>
        <div className='tech-drop' ref={techRef}>
          <button className='tech-drop-button' onClick={() => setIsTechOpen(!isTechOpen)} id={`${isTechOpen ? 'open' : ''}`}>Tech stack:</button>
          <ul id={`${isTechOpen ? '' : 'open'}`}>
            Tech Stack:
            <li>SQLalchemy</li>
            <li>Alembic</li>
            <li>Python 3</li>
            <li>Html/CSS</li>
            <li>Flask</li>
            <li>React</li>
            <li>Redux</li>
            <li>PostgreSQL</li>
            <li>Node.js</li>
            <li>JSX</li>
            <li>Javascript</li>
            <li>SQLite3</li>
          </ul>
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
