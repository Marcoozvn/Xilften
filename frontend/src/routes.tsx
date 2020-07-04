import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useAuth } from './contexts/auth'

import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Route path='/' component={Home} exact />
    <Route path='/profile' component={Profile} />
  </BrowserRouter>
)

const AuthRoutes: React.FC = () => (
  <BrowserRouter>
    <Route path='/' component={Login} />
  </BrowserRouter>
)

const Routes: React.FC = () => {
  const { signed } = useAuth()

  return (
    <>{ signed ? <AppRoutes /> : <AuthRoutes /> }</>
  )
}

export default Routes