import React from 'react';
import { connect } from 'react-redux';
import { toggleEnding, toggleChildType } from '../../../actions/nodes';
import { toggleOnboarding } from '../../../actions/auth'
import RequiresLogin from '../../requires-login';
import EndingForm from './EndingNodeForm';
import NewNodeForm from './new-node-form';
import Button from '../../button';

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

    } else {
      onboarding = null
    }

    return (
      <div className='form-field'>
        {error}
        <Button
          onClick={() => this.toggleNewOrExistingNodeForm()}
          text='Use existing Checkpoint'
        />

        <Button
          onClick={() => this.toggleIsEnding()}
          text={this.props.isEnding ? 'Make Node a Checkpoint' : 'Make Node an Ending'}
        />
        {this.props.isEnding ? <EndingForm /> : <NewNodeForm />}
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