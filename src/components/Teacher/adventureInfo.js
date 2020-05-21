import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import RequiresLogin from '../requires-login'
import DeletePrompt from './DeletePrompt'
import AdventureDetails from './AdventureDetails'
import EditAdventureForm from '../Forms/Adventure/editAdventureForm'
import {
  deleteAdventure,
  getAdventureById,
  toggleAdventureEditing,
  toggleAnalyticsDisplay,
  toggleAdventureDeleting,
} from '../../actions/adventure'

export class AdventureInfo extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.dispatch(getAdventureById(id))

    if (this.props.isEditing) {
      this.props.dispatch(toggleAdventureEditing())
    }
  }

  onClickDelete(adId) {
    return this.props.dispatch(deleteAdventure(adId)).then(() => {
      this.props.dispatch(toggleAdventureDeleting())
      this.props.history.push('/dashboard')
    })
  }

  render() {
    const { dispatch, adventure, isEditing, isDeleting, showAnalytics } = this.props

    if (!adventure) {
      return <div>loading...</div>
    } else if (adventure && isDeleting) {
      return (
        <DeletePrompt
          handleDelete={() => this.onClickDelete(adventure.id)}
          handleCancel={() => dispatch(toggleAdventureDeleting())}
        >
          <h2>Are you sure you want to permanently delete Adventure {adventure.title}</h2>
          <h3>This cannot be undone</h3>
        </DeletePrompt>
      )
    } else if (adventure && isEditing) {
      return <EditAdventureForm />
    } else {
      return (
        <AdventureDetails
          adventure={adventure}
          showAnalytics={showAnalytics}
          toggleDelete={() => dispatch(toggleAdventureDeleting())}
          toggleAnalytics={() => dispatch(toggleAnalyticsDisplay())}
          toggleEdit={() => dispatch(toggleAdventureEditing())}
        />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isEditing: state.adventure.isEditing,
    isDeleting: state.adventure.isDeleting,
    adventure: state.adventure.currentAdventure,
    showAnalytics: state.adventure.showAnalytics,
  }
}

export default withRouter(RequiresLogin()(connect(mapStateToProps)(AdventureInfo)))
