import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, } from 'redux-form';

import Input from "../input";
import Button from '../../button';
import TextArea from "../textarea";
import RequiresLogin from '../../requires-login';
import { createNode } from '../../../actions/nodes';
import { required, nonEmpty } from "../../../utils/validators";
import { getAnswerTextFromParentInt } from '../../../utils/index'
import { toggleEnding, toggleChildType } from '../../../actions/nodes';

export class NewNodeForm extends React.Component {

  toggleIsEnding() {
    return this.props.dispatch(toggleEnding())
  }

  toggleNewOrExistingNodeForm() {
    this.props.dispatch(toggleChildType())
  }

  onSubmit(values) {
    const parentId = this.props.parentId;
    const parentInt = this.props.parentInt;
    const adventureId = this.props.adventureId;
    let { title, question, answerA, answerB, answerC, answerD, videoURL, textContent } = values;
    let newNode = {
      answerA,
      answerB,
      answerC,
      answerD,
      videoURL,
      question,
      parentId,
      parentInt,
      textContent,
      adventureId,
      ending: false,
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
    parentAnswer = parentAnswer.length > 50 ? parentAnswer.slice(0, 50).concat('...') : parentAnswer;
    return (
      <div className='form-field'>
        <h2>Create a New Node</h2>
        <h4>Choice {parentAnswer} will lead to this node.</h4>
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
          <Field
            autofocus
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
          <button>Add Node to Adventure</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {

  return {
    error: state.node.nodeError,
    isEnding: state.node.isEnding,
    parentInt: state.node.parentInt,
    onboarding: state.auth.onboarding,
    currentNode: state.node.currentNode,
    parentId: state.node.currentNode.id,
    adventureId: state.adventure.currentAdventure.id,
  };
};

export default RequiresLogin()(connect(mapStateToProps)(reduxForm({
  form: 'NewNode'
})(NewNodeForm)));


