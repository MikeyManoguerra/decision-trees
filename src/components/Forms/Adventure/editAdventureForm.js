import React from 'react';
import Input from "../input";
import TextArea from "../textarea";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Checkbox, Form } from 'semantic-ui-react';

import Button from '../../button';
import RequiresLogin from '../../requires-login';
import { required, nonEmpty, isTrimmedPassword } from "../../../utils/validators";
import { editAdventure, toggleAdventureEditing } from '../../../actions/adventure';

export class EditAdventureForm extends React.Component {
  renderCheckBox = ({ input, label }) => {
    return (
      <Form.Field>
        <Checkbox
          className="checkbox"
          autoFocus={true}
          // label={label}
          checked={input.value ? true : false}
          onChange={(e, { checked }) => {
            input.onChange(checked)
          }
          }
        />
      </Form.Field>
    );
  };

  toggleAdventureEditForm() {
    return this.props.dispatch(toggleAdventureEditing())
  }

  onSubmit(values) {
    let { title,
      startContent,
      startVideoURL,
      password,
      removePassword } = values;

    let adventure = {
      title,
      startContent,
      startVideoURL,
      password,
      removePassword
    };

    return this.props.dispatch(editAdventure(adventure))
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

    } else {
      onboarding = null
    }

    return (
      <section className="form-field adventure-form">
        <h2>Edit Adventure Information</h2>
        <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          {error}
          <div className="form-questions">

            <Field
              autoFocus
              type="text"
              name="title"
              placeholder="Adventure"
              label="Adventure Title"
              ariaLabel="Adventure title"
              className="title input-field"
              component={Input}
              validate={[required, nonEmpty]} />
            <Field
              type="text"
              name="startContent"
              className="startContent"
              label="Adventure Introduction"
              ariaLabel="Adventure Introduction"
              placeholder="This is the beginning of your learning quest. Let's have some fun!"
              component={TextArea}
            />
            <Field
              type="text"
              name="startVideoURL"
              className="videoURL input-field"
              label="Opening video URL(optional)"
              ariaLabel="Opening video URL(optional)"
              placeholder="https://www.youtube.com/embed/dHSQAEam2yc"
              component={Input}
            // validate={url({ protocols: ['http', 'https'] })}
            />
            <Field
              type="text"
              name="password"
              ariaLabel="Temporary"
              className="textContent"
              label="Optional Password:"
              placeholder="Not Required"
              component={Input}
              validate={[isTrimmedPassword]}
            />
            <div className="checkbox-div">
              <Field
                className="removePassword"
                name="removePassword"
                // label="Remove Password"
                component={this.renderCheckBox}
                type="checkbox" />
              <label className="remove-password-label">Remove Password</label>
            </div>
          </div>
          <button className='update-button' type="submit">Update Adventure</button>
          {onboarding}
        </form>
        <Button onClick={() => this.toggleAdventureEditForm()} text='cancel' />
      </section>

    )
  }
}

const mapStateToProps = state => {

  return {
    isEditing: state.node.isEditing,
    isDeleting: state.node.isDeleting,
    onboarding: state.auth.onboarding,
    adventureId: state.adventure.currentAdventure.id,
    initialValues: Object.assign({}, state.adventure.currentAdventure),
  };
};



export default RequiresLogin()(
  connect(mapStateToProps)(
    reduxForm({
      form: 'Adventure',
      enableReinitialize: true
      // onSubmitFail: (errors, dispatch) =>
      //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
      //   ))
    })(EditAdventureForm)
  ));
