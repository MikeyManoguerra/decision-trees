import React from 'react';
import { connect } from 'react-redux';
import { toggleOnboarding } from '../../../actions/auth'
import RequiresLogin from '../../requires-login';
import EndingForm from './EndingNodeForm';
import NewNodeForm from './new-node-form';

import ExistingNodeSelector from '../../Teacher/existingNodeSelector'

export class ChildForms extends React.Component {
  
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
    let newNodeForm = this.props.isEnding ? <EndingForm /> : <NewNodeForm />

    return (
      <div className='form-field'>
        {error}
       
        {this.props.useExistingNode ?
          <ExistingNodeSelector /> :
          newNodeForm
        }
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
    error: state.node.nodeError,
    useExistingNode: state.node.useExistingNode
  };
};

export default RequiresLogin()(connect(mapStateToProps)(ChildForms));