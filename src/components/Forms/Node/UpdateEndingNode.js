import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Input from "../input";
import TextArea from "../textarea";
import RequiresLogin from '../../requires-login';
import { required, nonEmpty } from "../../../utils/validators";
import { updateNode, toggleUpdateForm } from '../../../actions/nodes'

export class UpdateEndingNode extends React.Component {

  cancelUpdate() {
    return this.props.dispatch(toggleUpdateForm())
  }

  onSubmit(values) {
    const parentId = this.props.parentId;
    const parentInt = this.props.parentInt;
    const nodeId = this.props.currentNodeId
    const adventureId = this.props.adventureId;
    let { title, videoURL, textContent, ending } = values;
    let newNode = {
      title,
      textContent,
      videoURL,
      parentInt,
      adventureId,
      parentId,
      nodeId,
      ending
    };
    this.props.dispatch(updateNode(newNode))
  }

  render() {
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

    return (
      <form
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <Field
          className="title input-field"
          label="Checkpoint Title"
          name="title"
          component={Input}
          type="text"
          placeholder='optional'
        // validate={[required, nonEmpty]}
        />
        <Field
          className="videoURL input-field"
          label="Video URL (optional)"
          placeholder="http://(videoURL)"
          name="videoURL"
          component={Input}
          type="text" />
        <Field
          className="textContent"
          label="Ending Description"
          name="textContent"
          component={TextArea}
          type="text"
          validate={[required, nonEmpty]} />
        {error}
        <button className='update-button' type="submit">Submit</button>
        {/* <button onClick={() => this.cancelUpdate()}>Cancel</button> */}
      </form>
    )
  }
}

const mapStateToProps = state => {

  return {
    nodeError: state.node.error,
    parentInt: state.node.parentInt,
    currentNode: state.node.currentNode,
    parentId: state.node.currentNode.id,
    currentNodeId: state.node.currentNode.id,
    adventureId: state.adventure.currentAdventure.id,
    initialValues: Object.assign({}, state.node.currentNode),
  };
};

export default RequiresLogin()(connect(mapStateToProps)(reduxForm({
  form: 'updateEndingNode',
  enableReinitialize: true
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(UpdateEndingNode)));
