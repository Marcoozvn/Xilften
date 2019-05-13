import React, { Component } from 'react'
import logo from '../../logo.svg';
import { Container, AppLogo, Form} from './styles';
import { Link } from 'react-router-dom'
import api from "../../services/api";
import { login } from "../../services/auth";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    console.log(this.state);

    const { username, password } = this.state;

    if (!username || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/user/login", { username , password });

        console.log(response);

        const { token, user: { name, _id } } = response.data;
        login(token, name, _id);
        this.props.history.push("/app");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <AppLogo src={logo} alt="logo" />
          <span>Turmalina Films</span>
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Login"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Login</button>
          <hr />
          <Link to="/signup">Cadastrar</Link>
        </Form>
      </Container>
    )
  }
}
