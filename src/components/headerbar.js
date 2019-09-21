import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../utils/local-storage';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { endStudentAdventure } from '../actions/student'

export class Headerbar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken()
    return <Redirect to="/login" />;
  }

  ifAdventureRemoveAdventure() {
    if (this.props.studentAdventure) {
      this.props.dispatch(endStudentAdventure())
    }
  }

  render() {
    // Only render log out button if we are logged in
    let logOut, pathCheck;
    pathCheck = (this.props.location.pathname === '/');
    logOut = this.props.loggedIn ? <Link  class='nav-item log-out'onClick={() => { this.logOut() }}>Log Out</Link> : null;
    return (
      <header role="banner" className="header-bar">
        <nav class="navigation">
        <Link class='nav-item' to="/" onClick={() => this.ifAdventureRemoveAdventure()} >Home </ Link>
        <Link class='nav-item' to="/dashboard">Dashboard</Link>
        {logOut}
        </nav>
        <h1 className="app-title">LearnVenture</h1>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  studentAdventure: state.student.adventure
});

export default withRouter(connect(mapStateToProps)(Headerbar));
