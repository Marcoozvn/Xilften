import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { login } from '../../services/Auth'
import { Link } from 'react-router-dom'
import Api from '../../services/Api'
import './styles.css'

export default ({ history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSignIn(e) {
    e.preventDefault()

    if (!username || !password) setError("Preencha e-mail e senha para continuar!")
    
    else {
      try {
        const response = await Api.post("/user/login", { username , password })
        const { token, user: { name, _id } } = response.data
        
        login(token, name, _id)

        history.push("/app")

      } catch (err) {
        setError("Houve um problema com o login, verifique suas credenciais. T.T")
      }
    }
  };

  return (
    <div className="content">
      <form onSubmit={handleSignIn}>
        <img src={logo} alt="Logo"/>
        { error && <p>{error}</p>}
        <input 
          id="username"
          type="text"
          placeholder="E-mail"
          onChange={e => setUsername(e.target.value)} 
          />

        <input 
          id="password"
          type="password"
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)} 
          />

        <button className="btn" type="submit">Login</button>
        <hr />
        <Link to="/signup">Fazer cadastro</Link>
      </form>
    </div>
  )
}