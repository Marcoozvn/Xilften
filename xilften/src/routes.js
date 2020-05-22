import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import { store } from './store/Store';

const PrivateRoute = ({component: Component, ...rest }) => (
  <Route 
    {...rest}
    render={props => store.getState('token').token ? (<Component {...props}/>) : (<Redirect to={{pathname: '/', state: { from: props.location }}}/>)}
  />
);

export default props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Login} exact/>
        <PrivateRoute path='/app' component={Dashboard} />
        <PrivateRoute path='/profile' component={Profile} />
      </Switch>
    </BrowserRouter>
  )
}