import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import LoginForm from './LoginForm'

export function LoginPage(props) {

  useEffect(() => {
    if (props.loggedIn) {
      props.history.push('/dashboard')
    }
  }, [props.loggedIn, props.history])

  return (
    <div className="landing-page">
      <p>Login Below</p>
      <p>
        New User? Click here to&nbsp;
        <Link className="login-from-register" to="/registration">
          Register
        </Link>
      </p>
      <LoginForm />
    </div>
  )
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.currentUser !== null,
})

export default withRouter(connect(mapStateToProps)(LoginPage))
