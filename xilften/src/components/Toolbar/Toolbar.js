import React from "react";
import './Toolbar.css';
import logo from '../../assets/logo.png';
import Menu from '../Menu/Menu';

export default ({ history }) => {

  return (
    <div className="toolbar">
      <img src={logo} alt="Logo" onClick={() => history.push('/app')}/>
      <Menu history={history}/>        
    </div>
  )
}