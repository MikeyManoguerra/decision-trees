import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Field, reduxForm } from 'redux-form'

import { Input, TextArea } from './Input'
import RequiresLogin from '../RequiresLogin'
import { createAdventure } from '../../actions/adventure'
import { required, nonEmpty, isTrimmedPassword } from '../../utils/validators'

export class AdventureForm extends React.Component {
  onSubmit(values) {
    let { title, startContent, textContent, startVideoURL, password } = values

    let adventure = {
      title,
      password,
      textContent,
      startContent,
      startVideoURL,
    }

    return this.props.dispatch(createAdventure(adventure)).then((res) => {
      // console.log(this.props.adventure, this.props.loading);
      // todo, put head in nested router
      this.props.history.push(`/head`)
    })
  }

  render() {
    return (
      <section className="form-field adventure-form">
        <h2>Create a new Adventure!</h2>
        <Form onSubmit={this.props.handleSubmit((values) => this.onSubmit(values))}>
          <Field
            className="input-field"
            label="Adventure Title"
            ariaLabel="Adventure title"
            placeholder="Adventure"
            name="title"
            component={Input}
            type="text"
            validate={[required, nonEmpty]}
          />
          <Field
            className="text-area"
            label="Adventure Introduction"
            ariaLabel="Adventure Introduction"
            placeholder="This is the beginning of your learning quest. Let's have some fun!"
            name="startContent"
            component={TextArea}
            type="text"
          />
          <Field
            className="input-field"
            label="Opening YouTube URL (optional)"
            ariaLabel="Opening YouTube URL (optional)"
            placeholder="https://www.youtube.com/embed/dHSQAEam2yc"
            name="startVideoURL"
            component={Input}
            // validate={url({ protocols: ['http', 'https'] })}
            type="text"
          />
          <Field
            className="input-field"
            label="Optional Password"
            ariaLabel="Temporary"
            name="password"
            component={Input}
            placeholder="Not Required"
            type="text"
            validate={[isTrimmedPassword]}
          />
          <button>New Adventure!</button>
        </Form>
      </section>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    error: state.adventure.error,
    adventure: state.adventure.currentAdventure,
    loading: state.adventure.loading
  }
}

export default withRouter(
  RequiresLogin()(
    connect(mapStateToProps)(
      reduxForm({
        form: 'Adventure',
        // onSubmitFail: (errors, dispatch) =>
        //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
        //   ))
      })(AdventureForm)
    )
  )
)
