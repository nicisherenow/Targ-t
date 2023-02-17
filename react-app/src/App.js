import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage';
import { authenticate } from './store/session';
import ItemPage from './components/ItemPage';
import CartPage from './components/CartPage';
import CheckoutLanding from './components/CheckoutLanding';
import WishlistPage from './components/WishlistPage';
import PageNotFound from './components/PageNotFound';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/checkout' exact={true}>
          <CheckoutLanding />
        </Route>
        <Route path='/cart' exact={true}>
          <CartPage />
        </Route>
        <Route path='/items/:itemId' exact={true}>
          <ItemPage />
        </Route>
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      <WishlistPage />
    </BrowserRouter>
  );
}

export default App;
