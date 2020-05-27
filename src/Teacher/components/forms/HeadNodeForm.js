import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'


import { Input, TextArea } from '../../../components/Input'
import { required, nonEmpty } from '../../../utils/validators'
import { RequiresLogin } from '../../../Auth'
import { createNode } from '../../nodeActions'


export class CreateHeadNode extends React.Component {
  componentDidMount() {
    if (!this.props.currentAdventure) {
      this.props.history.push('/dashboard')
    }
  }

  onSubmit(values) {
    const { title, answerA, answerB, answerC, answerD, videoURL, question, textContent } = values

    const adventureId = this.props.currentAdventure.id

    const newNode = {
      title,
      answerA,
      answerB,
      answerC,
      answerD,
      videoURL,
      question,
      textContent,
      adventureId,
      ending: false,
      nodeId: this.props.currentNodeId,
    }

    return this.props.dispatch(createNode(newNode)).then(() => {
      return this.props.history.push(`/adventure/${adventureId}/build`)
    })
  }

  render() {
    let error
    if (this.props.nodeError) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.nodeError}
        </div>
      )
    }

    return (
      <section className="form-field head-node-form">
        <h2>Please create a Head Node (The Starting point of your Adventure)</h2>
        <form onSubmit={this.props.handleSubmit((values) => this.onSubmit(values))}>
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
              validate={[required, nonEmpty]}
            />
            <Field
              className="videoURL input-field"
              label="YouTube URL :"
              name="videoURL"
              component={Input}
              type="text"
            />
            <Field
              className="question input-field"
              label="New Question"
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
          </div>
          {error}
          <button>New Checkpoint!</button>
        </form>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.node.nodeError,
  onboarding: state.auth.onboarding,
  currentAdventure: state.adventure.currentAdventure,
})

export default RequiresLogin()(
  connect(mapStateToProps)(
    reduxForm({
      form: 'CreateHeadNode',
      // onSubmitFail: (errors, dispatch) =>
      //   dispatch(focus('Adventure'/*, Object.keys(errors)[0]*/
      //   ))
    })(CreateHeadNode)
  )
)
