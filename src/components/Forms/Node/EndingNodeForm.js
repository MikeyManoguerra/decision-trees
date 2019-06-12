import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import Input from "../input";
import TextArea from "../textarea";
import { createNode } from '../../../actions/nodes';
import { required, nonEmpty } from "../../../utils/validators";
import RequiresLogin from '../../requires-login';
import { getAnswerTextFromParentInt } from '../../../utils/index'

export class EndingForm extends React.Component {

  onSubmit(values) {
    const parentInt = this.props.parentInt;
    const adventureId = this.props.adventureId;
    const parentId = this.props.parentId;
    let { title, videoURL, textContent, ending } = values;
    let newNode = {
      textContent,
      videoURL,
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
        <h2>Add Ending Node</h2>
        <h4>Choice that points to this Checkpoint: {parentAnswer}</h4>
        <form
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
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
            label="Ending Description"
            name="textContent"
            component={TextArea}
            type="text"
            validate={[required, nonEmpty]} />
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
    error: state.node.nodeError
  };
};

export default RequiresLogin()(connect(mapStateToProps)(reduxForm({
  form: 'EndNode',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('NewNode'/*, Object.keys(errors)[0]*/
    ))
})(EndingForm)));