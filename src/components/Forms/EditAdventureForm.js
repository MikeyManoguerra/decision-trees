import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Checkbox, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


import { Input, TextArea } from './Input'
import RequiresLogin from '../RequiresLogin'
import { required, nonEmpty, isTrimmedPassword } from '../../utils/validators'
import { editAdventure } from '../../actions/adventure'

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
          }}
        />
      </Form.Field>
    )
  }

  onSubmit(values) {
    const { title, password, startContent, startVideoURL, removePassword } = values

    let adventure = {
      title,
      password,
      startContent,
      startVideoURL,
      removePassword,
    }

    return this.props.dispatch(editAdventure(adventure)).then(() => {
      this.props.history.push(`/adventure/${this.props.adventureId}`)
    })
  }

  render() {
    return (
      <section className="form-field adventure-form">
        <h2>Edit Adventure Information</h2>
        <form onSubmit={this.props.handleSubmit((values) => this.onSubmit(values))}>
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
              validate={[required, nonEmpty]}
            />
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
                type="checkbox"
              />
              <label className="remove-password-label">Remove Password</label>
            </div>
          </div>
          <button className="update-button" type="submit">
            Update Adventure
          </button>
        </form>
        <Link to="/adventure/:id" >Cancel</Link>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.adventure.loading,
    adventure: state.adventure.currentAdventure,
    adventureId: state.adventure.currentAdventure.id,
    initialValues: Object.assign({}, state.adventure.currentAdventure),
  }
}

export default RequiresLogin()(
  connect(mapStateToProps)(
    reduxForm({
      form: 'Adventure',
      enableReinitialize: true,
      // onSubmitFail: (errors, dispatch) =>
      //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
      //   ))
    })(EditAdventureForm)
  )
)
