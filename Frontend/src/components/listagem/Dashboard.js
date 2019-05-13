import React, { Component } from 'react'

import logo from '../../logo.svg';
import { getUserName, logout } from '../../services/auth';
import { Dash, AppLogo } from './styles';
import { IconButton } from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
  state = {
    user_name: ''
  }

  componentDidMount() {
    const name = getUserName();
    this.setState({ user_name: name });
  }

  logout = () => {
    logout();
    this.props.history.push("/");
  }

  render() {
    return (
      <Dash>
        <AppLogo src={logo} alt="logo"></AppLogo>
        <h1>Olá, {this.state.user_name}</h1>        
        <IconButton onClick={this.logout}>
          <PowerSettingsNew/>
        </IconButton>        
      </Dash>
    )
  }
}

export default withRouter(Dashboard);
