import React from 'react'
import { connect } from 'react-redux'

import Button from '../../components/button'
import { RequiresLogin } from '../../Auth'
import AdventureListItem from './AdventureListItem'
import { clearCurrentNode } from '../nodeActions'
import { getAllAdventures, clearCurrentAdventure } from '../adventureActions'

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAllAdventures())
    this.props.dispatch(clearCurrentNode())
    this.props.dispatch(clearCurrentAdventure())
  }

  render() {
    let noAdventures = (
      <div>
        <p>Your Adventures will display here!</p>
        <p>Try making one with the button below!</p>
      </div>
    )

    let list = this.props.adventures.map((adventure) => (
      <AdventureListItem key={adventure.id.toString()} adventure={adventure} />
    ))

    if (this.props.loading) {
      return <div className="loading">loading...</div>
    } else {
      return (
        <div className="dashboard center-content">
          <h3> Your Adventures</h3>

          <ul className="adventures-list" id="adventures">
            {list}
          </ul>
          {this.props.adventures.length === 0 ? noAdventures : null}
          <Button
            onClick={() => this.props.history.push('/new')}
            text="Create New Adventure"
          />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { currentUser } = state.auth

  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    adventures: state.adventure.adventures,
    onboarding: state.auth.onboarding,
  }
}

export default RequiresLogin()(connect(mapStateToProps)(Dashboard))
