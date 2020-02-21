import React from "react"
import './Toolbar.css'
import logo from '../../../assets/logo.png'
import { IconButton } from '@material-ui/core'
import { PowerSettingsNew } from '@material-ui/icons'
import PersonIcon from '@material-ui/icons/Person'
import { logout } from '../../../services/Auth'

export default ({ history }) => {

  function handleLogout() {
    logout()
    history.push("/")
  }

  return (
    <div className="toolbar">
      <img src={logo} alt="Logo" />
      <div className="buttons-wrapper">
        <div className="button-item">
          <IconButton>
            <PersonIcon />
          </IconButton>
          <span>Perfil</span>
        </div>
        <div className="button-item" onClick={handleLogout}>
          <IconButton >
            <PowerSettingsNew />
          </IconButton>  
          <span>Logout</span>
        </div>
      </div>
    </div>
  )
}