import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Input from "../components/Teacher/input";
import RequiresLogin from '../src/components/requires-login';
import TextArea from "../components/Teacher/textarea";
import { deleteNode } from '../src/actions/nodes';
import { required, nonEmpty } from "../src/utils/validators";
import {
  updateNode,
  toggleUpdateForm,
  toggleNodeDeleting,
  toggleEnding,
} from '../src/actions/nodes'
import { Checkbox, Form } from 'semantic-ui-react';
import { toggleOnboarding } from '../src/actions/auth'
import { getAnswerTextFromParentInt } from '../src/utils/index'


export class UpdateNodeForm extends React.Component {

  toggleIsEnding() {
    return this.props.dispatch(toggleEnding())
  }
  toggleNodeDeleting() {
    return this.props.dispatch(toggleNodeDeleting())
  }

  cancelUpdate() {
    return this.props.dispatch(toggleUpdateForm())
  }

  onClickDelete() {
    let nodeId = this.props.currentNodeId;
    let adId = this.props.adventureId;
    return this.props.dispatch(deleteNode(adId, nodeId))
  }

  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding())
  }

  onSubmit(values) {
    const parentInt = this.props.parentInt;
    const adventureId = this.props.adventureId;
    const parentId = this.props.parentId;
    const nodeId = this.props.currentNodeId
    let { title, question, answerA, answerB, answerC, answerD, videoURL, textContent, ending } = values;
    let newNode = {
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
    this.props.dispatch(updateNode(newNode))
  }

  renderCheckBox = ({ input, label }) => {
    return (
      <Form.Field>
        <Checkbox
          label={label}
          checked={input.value ? true : false}
          onChange={(e, { checked }) => {
            input.onChange(checked)
            this.toggleIsEnding()
          }}
        />
      </Form.Field>
    );
  };

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


    // Used to display which parent points to this node only
    let parentAnswer = getAnswerTextFromParentInt(this.props.parentInt, this.props.currentNode);


    // what questions variable is dependent upon whether current node being edited is
    // an ending or not
    let questions;

    if (this.props.isEnding) {
      questions = (
        <Field
          className="textContent"
          label="Ending Description"
          name="textContent"
          component={TextArea}
          type="text"
          validate={[required, nonEmpty]} />
      )
    } else {
      questions = (
        <div className="questionAndAnswers">
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
        </div>
      )
    }

    // renders the delete warning and button only, with a go back button
    if (this.props.isDeleting) {
      return (
        <div className="current-node-brancher">
          <h3>Are you sure you want to delete this Checkpoint?</h3>
          {error}
          <div className="buttons">
            <button
              className=" on-left delete-button"
              type='button'
              onClick={id => this.onClickDelete(id)}
            >Delete It
            </button>
            <button
              className="keep-it on-right"
              type='button'
              onClick={() => this.toggleNodeDeleting()}
            >Keep It
            </button>
          </div>
        </div>
      )
    }
    // render the update node form
    else
      return (
        <div className='current-node-brancher'>
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
            // validate={[required, nonEmpty]}
            />
            <Field
              className="videoURL input-field"
              label="Video URL (optional)"
              placeholder="http://(videoURL)"
              name="videoURL"
              component={Input}
              type="text" />
            {questions}
            {error}
            <button className='update-button' type="submit">Update Node</button>
          </form>
          <button onClick={() => this.cancelUpdate()}>Cancel</button>
          <button className="delete-node-toggle" onClick={() => this.toggleNodeDeleting()}>Delete Checkpoint</button>
          {onboarding}
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
    isDeleting: state.node.isDeleting,
    onboarding: state.auth.onboarding,
    nodeError: state.node.error
  };
};

export default RequiresLogin()(connect(mapStateToProps)(reduxForm({
  form: 'NewNode',
  enableReinitialize: true
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(UpdateNodeForm)));
