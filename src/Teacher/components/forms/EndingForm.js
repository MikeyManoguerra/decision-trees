import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Input, TextArea } from '../../../components/Input'
import { required, nonEmpty } from '../../../utils/validators'

export class UpdateEndingNode extends React.Component {
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
        // validate={[required, nonEmpty]}
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
          className="textContent"
          label="Ending Description"
          name="textContent"
          component={TextArea}
          type="text"
          validate={[required, nonEmpty]}
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
    form: 'Ending',
    enableReinitialize: true,
    // onSubmitFail: (errors, dispatch) =>
    //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
    //   ))
  })(UpdateEndingNode)
)
