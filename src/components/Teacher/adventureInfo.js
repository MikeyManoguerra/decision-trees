import React from 'react';
import { connect } from 'react-redux';
import EditAdventureForm from '../Forms/Adventure/editAdventureForm'
import RequiresLogin from '../requires-login';
import {
  getAdventureById,
  toggleAdventureEditing,
} from '../../actions/createAdventure'
import DeleteAdventure from './DeleteAdventure';
import AdventureDetails from './AdventureDetails'

export class AdventureInfo extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getAdventureById(id));
    if (this.props.isEditing) {
      this.props.dispatch(toggleAdventureEditing())
    }
  }

  render() {
    const adventure = this.props.currentAdventure
    if (!adventure) {
      return <div>loading...</div>
    }
    else if (adventure && this.props.isDeleting) {
      return (
        <DeleteAdventure />
      );
    }
    else if (adventure && this.props.isEditing) {
      return (
        <EditAdventureForm />
      );
    }
    else {
      return (
        <AdventureDetails />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    currentAdventure: state.adventure.currentAdventure,
    isDeleting: state.adventure.isDeleting,
    isEditing: state.adventure.isEditing,
  };
};

export default RequiresLogin()(connect(mapStateToProps)(AdventureInfo));
