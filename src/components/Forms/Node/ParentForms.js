import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from '../../requires-login';
import {
  toggleNodeDeleting,
  toggleEnding,
} from '../../../actions/nodes'
import { toggleOnboarding } from '../../../actions/auth'
import UpdateCheckpointNode from './UpdateCheckpointNode'
import DeleteNode from '../../Teacher/DeleteNode'
import UpdateEndingNode from './UpdateEndingNode';

export class ParentForms extends React.Component {

  toggleIsEnding() {
    return this.props.dispatch(toggleEnding())
  }
  toggleNodeDeleting() {
    return this.props.dispatch(toggleNodeDeleting())
  }

  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding())
  }

  render() {
    console.log('i mounted')
    let error;
    if (this.props.nodeError) {
      error = (
        <div className="form-error" aria-live="polite">
          <p>
            {this.props.nodeError}
          </p>
        </div>
      );
    }

    let onboarding;
    if (this.props.onboarding) {
      onboarding = <div className="wideOnboarding arrowBox_Top onboarding">
        <span>This form is for changing the information of your current checkpoint. You can use it to change or add
        the <strong> Title</strong>, <strong> Scenario Description</strong>, <em>optional</em>
          <strong> YouTube URL</strong>,<strong> Question</strong>, and <strong>Choices</strong>. You can also change
          a checkpoint to and ending or delete it. Click cancel to undo any changes and go back to the LearnVenture builder.</span>
        <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
      </div>
    } else {
      onboarding = null
    }

    let updateForm;
    if (this.props.isEnding) {
      updateForm = <UpdateEndingNode />
    } else {
      updateForm = <UpdateCheckpointNode />
    }

    return (
      <div className='current-node-brancher' >
        <h2>This Checkpoint: {
          this.props.currentNode.title ?
            this.props.currentNode.title :
            this.props.currentNode.question}</h2>
        {this.props.isDeleting ? <DeleteNode /> : updateForm}
        < button onClick={() => this.cancelUpdate()}> Cancel</button >
        <button className="delete-node-toggle" onClick={() => this.toggleNodeDeleting()}>Delete Checkpoint</button>
        {onboarding}
      </div >)
  }
}

const mapStateToProps = state => {

  return {
    currentNode: state.node.currentNode,
    currentNodeId: state.node.currentNode.id,
    adventureId: state.adventure.currentAdventure.id,
    isEnding: state.node.isEnding,
    isDeleting: state.node.isDeleting,
    onboarding: state.auth.onboarding,
    nodeError: state.node.error
  };
};

export default RequiresLogin()(connect(mapStateToProps)(ParentForms));