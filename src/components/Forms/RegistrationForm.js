import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Field, reduxForm, focus } from 'redux-form'

import { Input } from './Input'
import { loginUser } from '../../actions/auth'
import { registerUser } from '../../actions/register'
import { required, nonEmpty, matches, length, isTrimmed } from '../../utils/validators'

const matchesPassword = matches('password')
const passwordLength = length({ min: 10, max: 72 })

class RegisterForm extends React.Component {
  onSubmit(values) {
    let { password, username, firstName, lastName } = values
    let user = { password, username, firstName, lastName }
    let loginInfo = { password, username }

    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(loginUser(loginInfo)))
  }
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />
    }
    // let error;
    // if (this.props.error) {
    //   error = (
    //     <div className="form-error" aria-live="polite">
    //       {this.props.error}
    //     </div>
    //   );
    // }
    return (
      <Form
        className="registration-form"
        name="registration-form"
        onSubmit={this.props.handleSubmit((values) => this.onSubmit(values))}
      >
        {/*error*/}
        <Field
          label="First Name"
          className="firstName input-field"
          name="firstName"
          component={Input}
          type="text"
        />
        <Field
          label="Last Name"
          className="lastName input-field"
          name="lastName"
          component={Input}
          type="text"
        />
        <Field
          label="Username"
          className="username input-field"
          name="username"
          component={Input}
          type="text"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <Field
          label="Password"
          className="password input-field"
          name="password"
          component={Input}
          type="password"
          validate={[required, nonEmpty, isTrimmed, passwordLength]}
        />
        <Field
          label="Password (again)"
          className="confirm-password input-field"
          name="confirm-password"
          component={Input}
          type="password"
          validate={[required, nonEmpty, isTrimmed, matchesPassword]}
        />
        <button type="submit" className="" disabled={this.props.pristine || this.props.submitting}>
          Register
        </button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.currentUser !== null,
})

export default connect(mapStateToProps)(
  reduxForm({
    form: 'registration-form',
    onSubmitFail: (errors, dispatch) =>
      dispatch(focus('registration-form', Object.keys(errors)[0])),
  })(RegisterForm)
)
