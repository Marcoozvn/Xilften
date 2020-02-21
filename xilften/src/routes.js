import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login/Login'
import Registro from './pages/Login/Registro'
import Dashboard from './pages/Dashboard/Dashboard'

export default props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Login} exact/>
        <Route path='/signup' component={Registro} />
        <Route path='/app' component={Dashboard} />
      </Switch>
    </BrowserRouter>
  )
}