import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export default () => (Component) => {
  function RequiresLogin(props) {
    const { authenticating, loggedIn, error, ...passThroughProps } = props

    if (authenticating) {
      return <div>Logging in...</div>
    }
    else if (!loggedIn || error) {
      return <Redirect to="/login" />
    }

    return <Component {...passThroughProps} />
  }

  const displayName = Component.displayName || Component.name || 'Component'
  RequiresLogin.displayName = `RequiresLogin(${displayName})`

  const mapStateToProps = (state, props) => ({
    error: state.auth.error,
    authenticating: state.auth.loading,
    loggedIn: state.auth.currentUser !== null,
  })

  return connect(mapStateToProps)(RequiresLogin)
}
