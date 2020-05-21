import React from 'react';
import { connect } from 'react-redux';
import { toggleEnding, toggleChildType } from '../../../actions/nodes';

import { Field, reduxForm, focus } from 'redux-form';
import Input from "../input";
import TextArea from "../textarea";
import { createNode } from '../../../actions/nodes';
import { required, nonEmpty } from "../../../utils/validators";

export class EndingForm extends React.Component {

  onSubmit(values) {
    const parentId = this.props.parentId;
    const parentInt = this.props.parentInt;
    const adventureId = this.props.adventureId;
    let { title, videoURL, textContent } = values;
    let newNode = {
      title,
      parentId,
      videoURL,
      parentInt,
      adventureId,
      textContent,
      ending: true,
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

    return (
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
        <button>Add Node to Adventure</button>
      </form>
    )
  }
}

const mapStateToProps = state => {

  return {
    error: state.node.nodeError,
    isEnding: state.node.isEnding,
    parentInt: state.node.parentInt,
    currentNode: state.node.currentNode,
    parentId: state.node.currentNode.id,
    adventureId: state.adventure.currentAdventure.id,
  };
};

export default (connect(mapStateToProps)(reduxForm({
  form: 'EndNode',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('NewNode'/*, Object.keys(errors)[0]*/
    ))
})(EndingForm)));
