import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from '../requires-login';
import { Link } from 'react-router-dom';
import { getAllAdventures, clearCurrentAdventure } from '../../actions/createAdventure'
import { toggleOnboarding } from '../../actions/auth'
import { clearCurrentNode } from '../../actions/nodes'
import Button from '../button';
import AdventureListItem from './AdventureListItem';

export class Dashboard extends React.Component {

  componentDidMount() {
    this.props.dispatch(getAllAdventures())
    this.props.dispatch(clearCurrentNode())
    this.props.dispatch(clearCurrentAdventure())
  }

  render() {
    let noAdventures = (<div>
      <p>Your LearnVentures will display here!</p>
      <p>Try making one with the button below!</p>
    </div>
    )


    let list = this.props.adventures.map((adventure, index) => (
      <AdventureListItem adventure={adventure} index={index} />));


    if (this.props.loading) {
      return <div className="loading">loading...</div>;
    }

    else {
      return (
        <div className="dashboard">
          <ul className="adventures-list" id="adventures">
            {list}
          </ul>
          {this.props.adventures.length === 0 ? noAdventures : null}
          <Button
            onClick={() => this.props.history.push('/adventure')}
            text='Create New LearnVenture'
          />
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  // TO-DO ADD ADVENTURE STATE/STORE
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    adventures: state.adventure.adventures,
    onboarding: state.auth.onboarding
  };
};

export default RequiresLogin()(connect(mapStateToProps)(Dashboard));
