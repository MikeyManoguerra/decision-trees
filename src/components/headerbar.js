import React from 'react'
import { connect } from 'react-redux'
import { clearAuth } from '../actions/auth'
import { clearAuthToken } from '../utils/local-storage'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { endStudentAdventure } from '../actions/student'

export class Headerbar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth())
    clearAuthToken()
    return <Redirect to="/login" />
  }

  ifAdventureRemoveAdventure() {
    if (this.props.studentAdventure) {
      this.props.dispatch(endStudentAdventure())
    }
  }

  render() {
    // Only render log out button if we are logged in
    return (
      <header role="banner" className="header-bar">
        <ul className="navigation">
          <li>
            <Link to="/" onClick={() => this.ifAdventureRemoveAdventure()}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard">My Adventures</Link>
          </li>
          {this.props.loggedIn
            && (
              <li className="log-out">
                <Link
                  to="/"
                  onClick={() => this.logOut()}
                >
                  Log Out
                </Link>
              </li>
            )}
        </ul>
        <h1 className="app-title">The Knowledge Maze</h1>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.currentUser !== null,
  studentAdventure: state.student.adventure,
})

export default withRouter(connect(mapStateToProps)(Headerbar))
