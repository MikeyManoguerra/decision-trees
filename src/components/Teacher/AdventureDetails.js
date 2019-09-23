import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from '../requires-login';
import Analytics from './analytics'
import {
  toggleAdventureDeleting,
  toggleAdventureEditing,
  toggleAnalyticsDisplay
} from '../../actions/createAdventure'
import { toggleOnboarding } from '../../actions/auth'
import Button from '../button'
import {
  withRouter
} from 'react-router-dom'

export class AdventureDetails extends React.Component {

  displayAdventureDeleting() {
    return this.props.dispatch(toggleAdventureDeleting())
  }
  toggleAdventureEditForm() {
    return this.props.dispatch(toggleAdventureEditing())
  }
  showAnalytics() {
    return this.props.dispatch(toggleAnalyticsDisplay())
  }
  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding())
  }

  render() {

    const adventure = this.props.currentAdventure
    let password;

    if (adventure.hasPassword) {
      password = <span>This LearnVenture is password protected</span>
    }
    let nodeVideo;
    if (adventure.startVideoURL) {
      nodeVideo = (
        <div>
          <h3 className="info-category">Opening Video</h3>
          <iframe title='node-video' width="420" height="315" src={adventure.startVideoURL}></iframe>
        </div>
      )
    }

    return (
      <div id='adventure-info'>
        <div className="dashboard-title">
          <h2>Adventure Dashboard</h2>
        </div>
        <div className="adventure-details">
          <h2 className="adventure-title">{adventure.title}</h2>
          <h3 className="info-category">Adventure Introduction Text</h3> <p>{adventure.startContent}</p>
          <div>{nodeVideo}</div>
          <h3 className="info-category">Starting Scenario</h3> <p>{adventure.textContent}</p>
          <h3 className="info-category">LearnVenture Code:</h3> <p>{adventure.id}</p>
          {password}
        </div>
        <div className="adventure-navigator">
          <Button
            onClick={() => this.props.history.push(`/adventure/adventurebuilder/${adventure.id}`)}
            text='Build' />
          <Button
            onClick={() => this.toggleAdventureEditForm()}
            text='Edit Info Text'
          />
          <Button
            onClick={() => this.displayAdventureDeleting()}
            text='Delete'
          />
          <Button
            onClick={() => this.showAnalytics()}
            text={this.props.showAnalytics ? 'Hide' : 'Analytics'}
          />
        </div>
        {this.props.showAnalytics ? <Analytics /> : null}
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { currentUser } = state.auth;
  // TO-DO ADD ADVENTURE STATE/STORE
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    currentAdventure: state.adventure.currentAdventure,
    isDeleting: state.adventure.isDeleting,
    isEditing: state.adventure.isEditing,
    showAnalytics: state.adventure.showAnalytics,
    onboarding: state.auth.onboarding
  };
};

export default withRouter(RequiresLogin()(connect(mapStateToProps)(AdventureDetails)));
