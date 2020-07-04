import React from "react"
import { useHistory } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import Menu from '../Menu'

import './styles.css'

export default () => {
  const history = useHistory()

  return (
    <div className="toolbar">
      <img className="logo" src={logo} alt="Logo" onClick={() => history.push('/')}/>
      <Menu />        
    </div>
  )
}