import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

export default class Index extends React.Component {
  state = {
    email: '',
    senha: '',
    isLoggedIn: false
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  signOut = () => {
    this.setState({ email: '' });
    this.setState({ senha: '' });
    this.setState({ isLoggedIn: false });
  }

  handleSubmit = event => {
    event.preventDefault();

    let email = this.state.email;
    let senha = this.state.senha;

    axios.post(`https://projeto-integrador-4.herokuapp.com/auth/login`, { email, senha })
      .then(res =>
        this.setState({ isLoggedIn: (res.status === 200) })
      ).catch(err =>
        alert('Authentication failed, try again!')
      );
  }

  render() {
    let body = (this.state.isLoggedIn)
      ? <div>
        <p>Status: Connected</p>
        <button onClick={this.signOut}>Sair</button>
      </div>
      : <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
          <input type="email" name="email" onChange={this.handleChangeEmail} />
          </label>
          <label>
            Senha:
          <input type="senha" name="senha" onChange={this.handleChangePassword} />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>

    return (
      body
    )
  }
}


ReactDOM.render(
  <Index>
  </Index>,
  document.getElementById('root')
);
