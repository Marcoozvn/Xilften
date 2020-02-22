import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';

export default props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Login} exact/>
        <Route path='/app' component={Dashboard} />
        <Route path='/profile' component={Profile} />
      </Switch>
    </BrowserRouter>
  )
}