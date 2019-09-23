import React from 'react';
import { connect } from "react-redux";

import RequiresLogin from '../../requires-login';
import { createNode } from '../../../actions/nodes'
import { Field, reduxForm } from 'redux-form';
import TextArea from "../textarea";
import Input from "../input";
import { required, nonEmpty } from "../../../utils/validators";
import { toggleOnboarding } from '../../../actions/auth'

export class CreateHeadNode extends React.Component {

  componentDidMount() {
    if (!this.props.currentAdventure) {
      this.props.history.push('/dashboard')
    }
  }

  onSubmit(values) {
    const adventureId = this.props.currentAdventure.id;
    const nodeId = this.props.currentNodeId
    const ending = false
    let { question, answerA, answerB, answerC, answerD, videoURL, textContent, title } = values;
    let newNode = {
      title,
      answerA,
      answerB,
      answerC,
      answerD,
      textContent,
      videoURL,
      question,
      adventureId,
      nodeId,
      ending
    };
    return this.props.dispatch(createNode(newNode))
      .then(() => {
        return this.props.history.push(`/adventure/adventurebuilder/${adventureId}`)
      })
  }

  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding())
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
      <section className='form-field head-node-form'>
        <h2>Please create a Head Node (The Starting point of your Adventure)</h2>
        <form
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <div className="form-questions">
            <Field
              className="title input-field"
              label="Checkpoint Title: "
              name="title"
              component={Input}
              type="text"
            // validate={[required, nonEmpty]} 
            />
            <Field
              className="textContent"
              label="Scenario Description"
              name="textContent"
              component={TextArea}
              type="text"
              validate={[required, nonEmpty]} />
            <Field
              className="videoURL input-field"
              label="YouTube URL :"
              name="videoURL"
              component={Input}
              type="text" />
            <Field
              className="question input-field"
              label="New Question"
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
          {error}
          <button>New Checkpoint!</button>
        </form>
      </section>

    )
  }
}

const mapStateToProps = (state, props) => ({
  currentAdventure: state.adventure.currentAdventure,

  onboarding: state.auth.onboarding,
  error: state.node.nodeError

});

export default RequiresLogin()(connect(mapStateToProps)(reduxForm({
  form: 'CreateHeadNode',

  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(CreateHeadNode)));