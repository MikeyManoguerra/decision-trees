import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import Input from "../input";
import { connect } from 'react-redux';
import RequiresLogin from '../../requires-login';
import TextArea from "../textarea";
import { createAdventure } from '../../../actions/createAdventure';
import { required, nonEmpty, isTrimmedPassword } from "../../../utils/validators";
import { withRouter } from 'react-router-dom';
import { toggleOnboarding } from '../../../actions/auth'


export class AdventureForm extends React.Component {

  onSubmit(values) {
    let { title,
      startContent,
      textContent,
      startVideoURL,
      password } = values;
    let adventure = {
      title,
      startContent,
      textContent,
      startVideoURL,
      password
    };
    return this.props.dispatch(createAdventure(adventure))
      .then(() => {
        this.props.history.push(`/adventure/headnode`)
      })
  }

  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding())
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    let onboarding;
    if (this.props.onboarding) {
      onboarding =  'hey'
    } else {
      onboarding = null
    }
    return (
      <section className="form-field adventure-form">
        <h2>Create a new Adventure!</h2>
        <Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          {error}
          <Field
            className="input-field"
            label="Adventure Title"
            ariaLabel="Adventure title"
            placeholder="Adventure"
            name="title"
            component={Input}
            type="text"
            validate={[required, nonEmpty]} />
          <Field
            className="text-area"
            label="Adventure Introduction"
            ariaLabel="Adventure Introduction"
            placeholder="This is the beginning of your learning quest. Let's have some fun!"
            name="startContent"
            component={TextArea}
            type="text" />
          <Field
            className="input-field"
            label="Opening YouTube URL (optional)"
            ariaLabel="Opening YouTube URL (optional)"
            placeholder="https://www.youtube.com/embed/dHSQAEam2yc"
            name="startVideoURL"
            component={Input}
            // validate={url({ protocols: ['http', 'https'] })}
            type="text" />
          <Field className="input-field"
            label="Optional Password"
            ariaLabel="Temporary"
            name="password"
            component={Input}
            placeholder="Not Required"
            type="text"
            validate={[isTrimmedPassword]} />
          <button>New Adventure!</button>
          {onboarding}
        </Form>
      </section>
    )
  }
}
const mapStateToProps = state => {
  return {
    error: state.adventure.error,
    onboarding: state.auth.onboarding
  }
}


export default withRouter(RequiresLogin()(connect(mapStateToProps)(reduxForm({
  form: 'Adventure',
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
  //   ))
})(AdventureForm))));