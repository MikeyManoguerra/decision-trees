import React from 'react';
import { connect } from 'react-redux';
import { toggleEnding, toggleChildType } from '../../actions/nodes';
import { toggleOnboarding } from '../../actions/auth'
import RequiresLogin from '../requires-login';
import EndingForm from './endingForm';
import NewNodeForm from './new-node-form';

export class ChildForms extends React.Component {
  toggleIsEnding() {
    return this.props.dispatch(toggleEnding())
  }
  toggleNewOrExistingNodeForm() {
    this.props.dispatch(toggleChildType())
  }
  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding())
  }

  render() {
    let error;
    // if (this.props.nodeError) {
    //   error = (
    //     <div className="form-error" aria-live="polite">
    //       {this.props.nodeError}
    //     </div>
    //   );
    // }
    let onboarding;
    if (this.props.onboarding) {
      onboarding = <div className="wideOnboarding arrowBox_Top onboarding">
        <span>This form is for creating the information of the new checkpoint which will stem from the Choice you selected above.
        If you'd like you can connect the selected Choice to an existing checkpoint by clicking <strong>Use Existing Checkpoint</strong>.
        Make this a standard checkpoint with a<strong> Title</strong>, <strong> Scenario Description</strong>, <em>optional</em>
          <strong> YouTube URL</strong> (<em>Only YouTube links work. Videos hosted
            on other sites are not supported at this time</em>), a<strong> Question</strong>, and <strong>Choices</strong>. Or you can set it as an ending.
          Endings only have an <em>optional</em> <strong> YouTube URL</strong> and an<strong> Ending Description</strong>. If a learner
          gets to an ending, their LearnVenture will be over and they will be prompted to start over if they'd like. Once create, you will
          see your new checkpoint in the graph above.</span>
        <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
      </div>
    } else {
      onboarding = null
    }

    return (
      <div className='form-field'>
        {error}
        <button
          onClick={() => this.toggleNewOrExistingNodeForm()}>
          Use existing Checkpoint
         </button>
        <button
          onClick={() => this.toggleIsEnding()}>
          {this.props.isEnding ? 'Make Node a Checkpoint' : 'Make Node an Ending'}
        </button>
        <div>{this.props.isEnding ? <EndingForm /> : <NewNodeForm />} </div>
        {onboarding}
      </div>)

  }
}

const mapStateToProps = state => {

  return {
    currentNode: state.node.currentNode,
    parentInt: state.node.parentInt,
    adventureId: state.adventure.currentAdventure.id,
    parentId: state.node.currentNode.id,
    isEnding: state.node.isEnding,
    onboarding: state.auth.onboarding,
    error: state.node.nodeError
  };
};

export default RequiresLogin()(connect(mapStateToProps)(ChildForms));