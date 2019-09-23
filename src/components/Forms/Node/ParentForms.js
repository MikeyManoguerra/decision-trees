import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from '../../requires-login';
import {
  toggleNodeDeleting,
  toggleEnding,
  toggleUpdateForm
} from '../../../actions/nodes'
import { toggleOnboarding } from '../../../actions/auth'
import UpdateCheckpointNode from './UpdateCheckpointNode'
import DeleteNode from '../../Teacher/DeleteNode'
import UpdateEndingNode from './UpdateEndingNode';
import Button from '../../button'

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
  cancelUpdate() {
    return this.props.dispatch(toggleUpdateForm())
  }

  render() {
  // let error;
  //   if (this.props.nodeError) {
  //     error = (
  //       <div className="form-error" aria-live="polite">
  //         <p>
  //           {this.props.nodeError}
  //         </p>
  //       </div>
  //     );  
  //   }

    let updateForm;
    if (this.props.isEnding) {
      updateForm = <UpdateEndingNode />
    } else {
      updateForm = <UpdateCheckpointNode />
    }

    let deletePanel= ( <div className="delete-panel">
    <Button onClick={() => this.cancelUpdate()} text='Cancel' />
    <Button className="delete-button"
      onClick={() => this.toggleNodeDeleting()}
      text='Delete' />
    </div >)

    return (
      <div className='current-node-brancher' >
        <h2>This Checkpoint: {
          this.props.currentNode.title ?
            this.props.currentNode.title :
            this.props.currentNode.question}</h2>
        {this.props.isDeleting ? <DeleteNode /> : updateForm}
        {this.props.isDeleting ? null: deletePanel}
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