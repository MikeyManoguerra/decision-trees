import React from 'react';
import Button from '../../button';
import { toggleEnding, toggleChildType } from '../../../actions/nodes';

import { connect } from 'react-redux';
import { Field, reduxForm,  } from 'redux-form';
import Input from "../input";
import TextArea from "../textarea";
import { createNode } from '../../../actions/nodes';
import { required, nonEmpty } from "../../../utils/validators";
import RequiresLogin from '../../requires-login';
import { getAnswerTextFromParentInt } from '../../../utils/index'

export class NewNodeForm extends React.Component {

  toggleIsEnding() {
    return this.props.dispatch(toggleEnding())
  }
  toggleNewOrExistingNodeForm() {
    this.props.dispatch(toggleChildType())
  }
  onSubmit(values) {
    const parentInt = this.props.parentInt;
    const adventureId = this.props.adventureId;
    const parentId = this.props.parentId;
    let { title, question, answerA, answerB, answerC, answerD, videoURL, textContent, ending } = values;
    let newNode = {
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
      ending,
      title,
    };
    return this.props.dispatch(createNode(newNode))
  }
  render() {
    let error;
    if (this.props.nodeError) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.nodeError}
        </div>
      );
    }

    let parentAnswer = getAnswerTextFromParentInt(this.props.parentInt, this.props.currentNode);

    return (
      <div className='form-field'>
        <h2>Add A New Checkpoint Node</h2>
        <h4>Choice that points to this Checkpoint: {parentAnswer}</h4>
        <Button
          onClick={() => this.toggleNewOrExistingNodeForm()}
          text='Use existing Checkpoint'
        />

        <Button
          onClick={() => this.toggleIsEnding()}
          text={this.props.isEnding ? 'Make Node a Checkpoint' : 'Make Node an Ending'}
        />
        <form
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          {error}
          <Field
            className="title"
            label="Checkpoint Title"
            name="title"
            component={Input}
            type="text"
            placeholder='optional'
          />
          <Field
            className="videoURL"
            label="YouTube URL (optional)"
            placeholder="http://(videoURL)"
            name="videoURL"
            component={Input}
            type="text" />
          <Field
            className="textContent"
            label="Scenario Description"
            name="textContent"
            component={TextArea}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="question"
            label="New Question"
            name="question"
            component={Input}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="answer A"
            label="Choice A"
            name="answerA"
            component={Input}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="answer B"
            placeholder="Optional"
            label="Choice B"
            name="answerB"
            component={Input}
            type="text"
          />
          <Field
            className="answer C"
            placeholder="Optional"
            label="Choice C"
            name='answerC'
            component={Input}
            type="text"
          />
          <Field
            className="answer D"
            placeholder="Optional"
            label="Choice D"
            name="answerD"
            component={Input}
            type="text"
          />
          {error}
          <button>Add Checkpoint to LearnVenture</button>
        </form>
      </div>
    )
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

export default RequiresLogin()(connect(mapStateToProps)(reduxForm({
  form: 'NewNode'
})(NewNodeForm)));


