import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../utils/local-storage';
import { withRouter, Redirect, Link } from 'react-router-dom';

export class Headerbar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken()
    return <Redirect to="/login" />;
  }

  render() {
    // Only render log out button if we are logged in
    let navButtons;
    if (this.props.loggedIn) {
      navButtons = <div className="nav-buttons">
        {/* TO-DO: REACT-ROUTER INSTEAD???????????????? */}
        <Link to="/dashboard">
          <button className="home-button">Home</button>
        </Link>
        <button type="button" onClick={() => {
          this.logOut()
        }}>Log Out</button>
        <Link to="/GraphContainer">
          <button className="graph-button">Graph Button</button>
        </Link>
      </div>
    }
    return (
      <header className="headerbar">
        <h1>This is Our App Title!</h1>
        {navButtons}
      </header>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(Headerbar));
