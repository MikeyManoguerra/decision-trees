import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Input from "../input";
import RequiresLogin from '../../requires-login';
import TextArea from "../textarea";
import { required, nonEmpty } from "../../../utils/validators";
import { updateNode, toggleUpdateForm } from '../../../actions/nodes'
import { getAnswerTextFromParentInt } from '../../../utils/index'

export class UpdateCheckpointNode extends React.Component {

  cancelUpdate() {
    return this.props.dispatch(toggleUpdateForm())
  }

  onSubmit(values) {
    const parentId = this.props.parentId;
    const parentInt = this.props.parentInt;
    const nodeId = this.props.currentNodeId
    const adventureId = this.props.adventureId;
    let { title, question, answerA, answerB, answerC, answerD, videoURL, textContent, ending } = values;
    let updatedNode = {
      title,
      nodeId,
      ending,
      answerA,
      answerB,
      answerC,
      answerD,
      videoURL,
      parentId,
      question,
      parentInt,
      textContent,
      adventureId,
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
        <h4>Choice {parentAnswer} Leads to this Node.</h4>
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
    nodeError: state.node.error,
    isEnding: state.node.isEnding,
    parentInt: state.node.parentInt,
    currentNode: state.node.currentNode,
    parentId: state.node.currentNode.id,
    currentNodeId: state.node.currentNode.id,
    nodes: state.adventure.currentAdventure.nodes,
    adventureId: state.adventure.currentAdventure.id,
    initialValues: Object.assign({}, state.node.currentNode),
  };
};

export default RequiresLogin()(connect(mapStateToProps)(reduxForm({
  form: 'NewNode',
  enableReinitialize: true
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(UpdateCheckpointNode)));
