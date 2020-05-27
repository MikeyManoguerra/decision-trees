import React, { Component } from 'react'
import { Route, withRouter, Switch, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'
import Home from './components/home'
import WrongTurn from './components/wrongTurn'
import Headerbar from './components/headerbar'
import Login from './Auth/components/Login'
import LandingPage from './components/LandingPage'
import { StudentView } from './Student'
import { Dashboard, HeadNodeForm, NewAdventureForm, AdventureLanding } from './Teacher'


import { refreshAuthToken } from './Auth'

class App extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh()
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh()
    }
  }
  componentWillUnmount() {
    this.stopPeriodicRefresh()
  }
  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    )
  }
  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return
    }
    clearInterval(this.refreshInterval)
  }

  render() {
    return (
      <div className="app">
        <div className="bottom-margin">
          <Router>
            <Route path="/" component={Headerbar} />
            <main role="main">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/registration" component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/new" component={NewAdventureForm} />
                <Route exact path="/head" component={HeadNodeForm} />
                <Route path="/adventure/:id" component={AdventureLanding} />
                <Route exact path="/student" component={StudentView} />
                <Route exact path='/404' component={WrongTurn} />
                <Route component={WrongTurn} />
              </Switch>
            </main>
          </Router>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null,
})

export default withRouter(connect(mapStateToProps)(App))
