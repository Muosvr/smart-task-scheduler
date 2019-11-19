import React, { Component } from 'react';
import axios from 'axios';
import Redirect from 'react-router-dom';


class GoogleLogin extends (Component) {
  state = { loginUrl: "" }
  componentDidMount() {
    axios.get('/oauth/login/')
      .then(res => {
        this.setState({ loginUrl: res.data.url })
        console.log('url received', res.data)
      })
  }
  render() {
    return (
      <div>
        <a href={this.state.loginUrl} target="_blank" >Google Login</a>
      </div >
    )
  }

}

export default GoogleLogin;