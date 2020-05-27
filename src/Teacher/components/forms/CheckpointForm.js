import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Input, TextArea } from '../../../components/Input'
import { required, nonEmpty } from '../../../utils/validators'

export class CheckpointForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit((values) => this.props.onSubmit(values))}>
        <Field
          className="title input-field"
          label="Checkpoint Title"
          name="title"
          component={Input}
          type="text"
          placeholder="optional"
        />
        <Field
          className="videoURL input-field"
          label="Video URL (optional)"
          placeholder="http://(videoURL)"
          name="videoURL"
          component={Input}
          type="text"
        />
        <Field
          className="textContent input-field"
          label="Scenario Description"
          name="textContent"
          component={TextArea}
          type="text"
          validate={[required, nonEmpty]}
        />
        <Field
          className="question input-field"
          label="Question"
          name="question"
          component={Input}
          type="text"
          validate={[required, nonEmpty]}
        />
        <Field
          className="answer A input-field"
          label="Choice A"
          name="answerA"
          component={Input}
          type="text"
          validate={[required, nonEmpty]}
        />
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
          name="answerC"
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
        <button className="update-button" type="submit">
          Submit
        </button>
      </form>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    initialValues: props.useValues ? Object.assign({}, state.node.currentNode) : {},
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'Checkpoint',
    enableReinitialize: true,
    // onSubmitFail: (errors, dispatch) =>
    //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
    //   ))
  })(CheckpointForm)
)
