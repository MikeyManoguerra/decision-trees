import React from 'react'
import { connect } from 'react-redux'
import {
  getStudentCurrentNode,
  restartStudentAdventure,
  getStudentAdventure,
  getStudentCurrentNodeError,
} from '../../actions/student'
import { Link } from 'react-router-dom'

export class StudentDisplay extends React.Component {
  updateNode(nodeId) {
    if (!nodeId) {
      const error = {
        message:
          'The creator of this Adventure did not specify the next Node for the answer you selected. We bet you can create a better Adventure!',
      }
      return this.props.dispatch(getStudentCurrentNodeError(error))
    }
    this.props.dispatch(getStudentCurrentNode(this.props.adventure.id, nodeId))
  }

  restart(adventureId) {
    this.props.dispatch(restartStudentAdventure())
    this.props.dispatch(getStudentAdventure(adventureId))
  }

  register() {
    this.props.history.push('/')
  }

  render() {
    let display
    let nodeVideo
    let nodeText
    let nodeQuestion
    let buttonA
    let buttonB
    let buttonC
    let buttonD
    let errorMessage
    if (this.props.error) {
      errorMessage = (
        <div>
          <p className="error-message">{this.props.error.message}</p>
        </div>
      )
    }
    if (this.props.currentNode) {
      if (this.props.currentNode.videoURL) {
        let videoPlay = this.props.currentNode.videoURL
        nodeVideo = <iframe title="node-video" width="420" height="315" src={videoPlay}></iframe>
      }
      if (this.props.currentNode.textContent) {
        nodeText = <p className="student-content">{this.props.currentNode.textContent}</p>
      }
      if (this.props.currentNode.question) {
        nodeQuestion = (
          <strong>
            <p className="student-question">{this.props.currentNode.question}</p>
          </strong>
        )
      }
      if (this.props.currentNode.answerA) {
        buttonA = (
          <button
            className="answer-button"
            onClick={() => this.updateNode(this.props.currentNode.pointerA)}
          >
            {this.props.currentNode.answerA}
          </button>
        )
      }
      if (this.props.currentNode.answerB) {
        buttonB = (
          <button
            className="answer-button"
            onClick={() => this.updateNode(this.props.currentNode.pointerB)}
          >
            {this.props.currentNode.answerB}
          </button>
        )
      }
      if (this.props.currentNode.answerC) {
        buttonC = (
          <button
            className="answer-button"
            onClick={() => this.updateNode(this.props.currentNode.pointerC)}
          >
            {this.props.currentNode.answerC}
          </button>
        )
      }
      if (this.props.currentNode.answerD) {
        buttonD = (
          <button
            className="answer-button"
            onClick={() => this.updateNode(this.props.currentNode.pointerD)}
          >
            {this.props.currentNode.answerD}
          </button>
        )
      }
      if (!this.props.currentNode.ending) {
        display = (
          <div className="student-display">
            {nodeVideo}
            <div id="description-question-box">
              {nodeText}
              {nodeQuestion}
            </div>
            {errorMessage}
            <br />
            {buttonA}
            <br />
            {buttonB}
            <br />
            {buttonC}
            <br />
            {buttonD}
            <br />
          </div>
        )
      } else {
        display = (
          <section>
            {nodeVideo}
            <strong>{nodeText}</strong>
            <p>Congratulations! This is the end of your Adventure.</p>
            <button
              className="return-to-start"
              onClick={() => this.restart(this.props.adventure.id)}
            >
              Return to Start
            </button>
            <p>
              <strong>
                If you'd like to create your own Adventure,{' '}
                <Link to="/registration">click here</Link> to create an account
              </strong>
            </p>
          </section>
        )
      }

      return <div className="student-display">{display}</div>
    } else {
      return (
        <div className="student-display">
          <h1>{this.props.adventure.title}</h1>
          <p>Created by: {this.props.adventure.creator}</p>
          <h2>{this.props.adventure.startContent}</h2>
          {errorMessage}
          <iframe
            title="starting-video"
            width="420"
            height="315"
            src={this.props.adventure.startVideoURL}
          ></iframe>
          <br />
          <button
            className="embark-button"
            onClick={() => this.updateNode(this.props.adventure.head)}
          >
            Embark
          </button>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    adventure: state.student.adventure,
    error: state.student.error,
    loading: state.student.loading,
    currentNode: state.student.currentNode,
    results: state.student.results,
  }
}

export default connect(mapStateToProps)(StudentDisplay)
