import React, { useState, FormEvent } from 'react'
import { useAuth } from '../../contexts/auth'

import './styles.css'

interface Props {
  changePage: () => void
}

const RegisterForm: React.FC<Props> = ({ changePage }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { signUp } = useAuth()

  async function handleSignUp(e: FormEvent) {
    e.preventDefault()

    if (!name || !username || !email || !password || !confirmPassword) setError("Preencha todos os dados para se cadastrar")

    else if ( password !== confirmPassword ) setError("A senha e a confirmação de senha são diferentes")
    
    else {
      try {
        await signUp(name, email, username, password)
        changePage()

      } catch (error) {
        setError('Ocorreu um erro. Tente novamente.')
      }
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSignUp}>
        { error && <p>{error}</p>}
        <input 
          id="name"
          type="text"
          placeholder="Qual o seu nome?"
          onChange={e => setName(e.target.value)} 
          />

        <input 
          id="email"
          type="email"
          placeholder="E-mail"
          onChange={e => setEmail(e.target.value)} 
          />

        <input 
          id="username"
          type="text"
          placeholder="Insira um username"
          onChange={e => setUsername(e.target.value)} 
          />

        <input 
          id="password"
          type="password"
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)} 
          />

        <input 
          id="password_confirmation"
          type="password"
          placeholder="Confirme sua senha"
          onChange={e => setConfirmPassword(e.target.value)} 
          />

        <button className="btn" type="submit">Cadastrar</button>
      </form>
    </div>
  )
}

export default RegisterForm