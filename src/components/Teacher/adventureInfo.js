import React from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom'

import RequiresLogin from '../requires-login';
import DeleteAdventure from './DeleteAdventure';
import AdventureDetails from './AdventureDetails'
import EditAdventureForm from '../Forms/Adventure/editAdventureForm'
import {
  getAdventureById,
  toggleAdventureEditing,
  toggleAnalyticsDisplay,
  toggleAdventureDeleting,
} from '../../actions/adventure'

export class AdventureInfo extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getAdventureById(id));

    if (this.props.isEditing) {
      this.props.dispatch(toggleAdventureEditing())
    }
  }

  render() {
    const {
      dispatch,
      adventure,
      showAnalytics,
      isDeleting,
      isEditing
    } = this.props

    if (!adventure) {
      return <div>loading...</div>
    }
    else if (adventure && isDeleting) {
      return (
        <DeleteAdventure />
      );
    }
    else if (adventure && isEditing) {
      return (
        <EditAdventureForm />
      );
    }
    else {
      return (
        <AdventureDetails
          adventure={adventure}
          showAnalytics={showAnalytics}
          toggleDelete={() => dispatch(toggleAdventureDeleting())}
          toggleAnalytics={() => dispatch(toggleAnalyticsDisplay())}
          toggleEdit={() => dispatch(toggleAdventureEditing())}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isEditing: state.adventure.isEditing,
    isDeleting: state.adventure.isDeleting,
    adventure: state.adventure.currentAdventure,
    showAnalytics: state.adventure.showAnalytics,
  };
};

export default withRouter(RequiresLogin()(connect(mapStateToProps)(AdventureInfo)));
