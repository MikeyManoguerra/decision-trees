import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import Login from './Forms/LoginForm'

export function LoginPage(props) {

  useEffect(() => {
    if (props.loggedIn) {
      props.history.push('/dashboard')
    }
  }, [props.loggedIn])

  return (
    <div className="landing-page">
      <p>Login Below</p>
      <p>
        New User? Click here to&nbsp;
        <Link className="login-from-register" to="/registration">
          Register
        </Link>
      </p>
      <Login />
    </div>
  )
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.currentUser !== null,
})

export default withRouter(connect(mapStateToProps)(LoginPage))
