import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from '../requires-login';
import Button from '../button'

import {
  toggleAdventureDeleting,
  deleteAdventure,
} from '../../actions/createAdventure'

export class DeleteAdventure extends React.Component {

  onClickDelete() {
    let adId = this.props.currentAdventure.id;
    return this.props.dispatch(deleteAdventure(adId))
      .then(() => {
        this.props.dispatch(toggleAdventureDeleting())
        this.props.history.push('/dashboard')

      })
  }

  displayAdventureDeleting() {
    return this.props.dispatch(toggleAdventureDeleting())
  }

  render() {
    return (
      <div className="confirm-delete-adventure">
        <h2>Are you sure you want to permanently delete Adventure?</h2>
        <h3>This cannot be undone</h3>
        <div className="buttons">
          <Button
            className="delete-button"
            onClick={() => this.onClickDelete()}
            text='Delete It'
          />
          <Button
            onClick={() => this.displayAdventureDeleting()}
            text='Keep It'
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // TO-DO ADD ADVENTURE STATE/STORE
  return {
    currentAdventure: state.adventure.currentAdventure,
    isDeleting: state.adventure.isDeleting
  };
};

export default RequiresLogin()(connect(mapStateToProps)(DeleteAdventure));