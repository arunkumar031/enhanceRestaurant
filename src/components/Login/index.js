import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
    showPassword: false,
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const inputData = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(inputData),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok) {
      const {history} = this.props
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPasssword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  renderForm = () => {
    const {username, password, showError, errorMsg, showPassword} = this.state
    const passwordType = showPassword ? 'text' : 'password'
    return (
      <div className="login-page">
        <form onSubmit={this.onClickLogin} className="login-form">
          <div className="input-container">
            <label htmlFor="username">USERNAME</label>
            <input
              placeholder="USERNAME"
              value={username}
              id="username"
              type="text"
              onChange={this.onChangeUsername}
              className="input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="pass">PASSWORD</label>
            <input
              placeholder="PASSWORD"
              value={password}
              id="pass"
              type={passwordType}
              onChange={this.onChangePassword}
              className="input"
            />
          </div>
          <div className="input-container">
            <input
              id="showPassword"
              type="checkbox"
              onClick={this.onClickShowPasssword}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {showError ? <p>{errorMsg}</p> : null}
        </form>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Redirect to="/" />
    }
    return <div>{this.renderForm()}</div>
  }
}

export default Login
