import React from 'react'
import { connect } from 'react-redux'
import {
  getStudentAdventure,
  getStudentCurrentNode,
  restartStudentAdventure,
  getStudentCurrentNodeError,
} from '../../actions/student'
import AdventureKickoff from './AdventureKickoff'
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
    const { currentNode, error, adventure } = this.props

    let display
    let buttonA
    let buttonB
    let buttonC
    let buttonD
    let errorMessage
    if (error) {
      errorMessage = (
        <div>
          <p className="error-message">{this.props.error.message}</p>
        </div>
      )
    }
    if (!currentNode) {

      return (
        <AdventureKickoff
          error={errorMessage}
          adventure={adventure}
          updateNode={(id) => this.updateNode(id)}
        />
      )
    }

    if (currentNode.ending) {
      return (
        <section>
          {currentNode.videoURL &&
            <iframe
              title="node-video"
              width="420"
              height="315"
              src={currentNode.videoURL}
            />
          }
          <p className="student-content">{currentNode.textContent}</p>
          <p>Congratulations! This is the end of your Adventure.</p>
          <button
            className="return-to-start"
            onClick={() => this.restart(this.props.adventure.id)}
          >
            Return to Start
          </button>
          <p>
            <strong>
              If you'd like to create your own Adventure,&nbsp;
              <Link to="/registration">click here</Link> to create an account
            </strong>
          </p>
        </section>
      )
    }
    else {
      if (currentNode.answerA) {
        buttonA = (
          <button
            className="answer-button"
            onClick={() => this.updateNode(currentNode.pointerA)}
          >
            {currentNode.answerA}
          </button>
        )
      }
      if (currentNode.answerB) {
        buttonB = (
          <button
            className="answer-button"
            onClick={() => this.updateNode(currentNode.pointerB)}
          >
            {currentNode.answerB}
          </button>
        )
      }
      if (currentNode.answerC) {
        buttonC = (
          <button
            className="answer-button"
            onClick={() => this.updateNode(currentNode.pointerC)}
          >
            {currentNode.answerC}
          </button>
        )
      }
      if (currentNode.answerD) {
        buttonD = (
          <button
            className="answer-button"
            onClick={() => this.updateNode(currentNode.pointerD)}
          >
            {currentNode.answerD}
          </button>
        )
      }

      display = (
        <div className="student-display">
          {currentNode.videoURL &&
            <iframe
              title="node-video"
              width="420"
              height="315"
              src={currentNode.videoURL}
            />
          }
          <div id="description-question-box">
            <p className="student-content">{currentNode.textContent}</p>
            <strong>
              <p className="student-question">{currentNode.question}</p>
            </strong>
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
      return <div className="student-display">{display}</div>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.student.error,
    loading: state.student.loading,
    results: state.student.results,
    adventure: state.student.adventure,
    currentNode: state.student.currentNode,
  }
}

export default connect(mapStateToProps)(StudentDisplay)
