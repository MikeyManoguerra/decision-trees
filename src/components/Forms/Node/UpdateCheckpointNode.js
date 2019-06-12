import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Input from "../input";
import RequiresLogin from '../../requires-login';
import TextArea from "../textarea";
import { required, nonEmpty } from "../../../utils/validators";
import {
  updateNode,
  toggleUpdateForm
} from '../../../actions/nodes'
import { getAnswerTextFromParentInt } from '../../../utils/index'

export class UpdateCheckpointNode extends React.Component {
  cancelUpdate() {
    return this.props.dispatch(toggleUpdateForm())
  }

  onSubmit(values) {
    const parentInt = this.props.parentInt;
    const adventureId = this.props.adventureId;
    const parentId = this.props.parentId;
    const nodeId = this.props.currentNodeId
    let { title, question, answerA, answerB, answerC, answerD, videoURL, textContent, ending } = values;
    let updatedNode = {
      title,
      answerA,
      answerB,
      answerC,
      answerD,
      textContent,
      videoURL,
      question,
      parentInt,
      adventureId,
      parentId,
      nodeId,
      ending
    };
    this.props.dispatch(updateNode(updatedNode))
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
    let parentAnswer = getAnswerTextFromParentInt(this.props.parentInt, this.props.currentNode);
    return (
      <div className='current-node-brancher' >
        <h2>This Checkpoint: {
          this.props.currentNode.title ?
            this.props.currentNode.title :
            this.props.currentNode.question}</h2>
        <h4>Choice that points to this Checkpoint: {parentAnswer}</h4>
        <form
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <Field
            className="title input-field"
            label="Checkpoint Title"
            name="title"
            component={Input}
            type="text"
            placeholder='optional'
          />
          <Field
            className="videoURL input-field"
            label="Video URL (optional)"
            placeholder="http://(videoURL)"
            name="videoURL"
            component={Input}
            type="text" />
          <Field
            className="textContent input-field"
            label="Scenario Description"
            name="textContent"
            component={TextArea}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="question input-field"
            label="Question"
            name="question"
            component={Input}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="answer A input-field"
            label="Choice A"
            name="answerA"
            component={Input}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="answer B input-field"
            placeholder="Optional"
            label="Choice B"
            name="answerB"
            component={Input}
            type="text"
          />
          <Field
            className="answer C input-field"
            placeholder="Optional"
            label="Choice C"
            name='answerC'
            component={Input}
            type="text"
          />
          <Field
            className="answer D input-field"
            placeholder="Optional"
            label="Choice D"
            name="answerD"
            component={Input}
            type="text"
          />
          {error}
          <button className='update-button' type="submit">Update Node</button>
        </form>
      </div>)
  }
}

const mapStateToProps = state => {
  return {
    currentNode: state.node.currentNode,
    nodes: state.adventure.currentAdventure.nodes,
    currentNodeId: state.node.currentNode.id,
    parentInt: state.node.parentInt,
    adventureId: state.adventure.currentAdventure.id,
    parentId: state.node.currentNode.id,
    initialValues: Object.assign({}, state.node.currentNode),
    isEnding: state.node.isEnding,
    nodeError: state.node.error
  };
};

export default RequiresLogin()(connect(mapStateToProps)(reduxForm({
  form: 'NewNode',
  enableReinitialize: true
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(UpdateCheckpointNode)));