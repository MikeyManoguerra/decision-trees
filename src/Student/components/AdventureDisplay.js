import React from 'react'
import { connect } from 'react-redux'
import AdventureEnding from './AdventureEnding'
import AdventureKickoff from './AdventureKickoff'
import {
  getStudentAdventure,
  getStudentCurrentNode,
  restartStudentAdventure,
  getStudentCurrentNodeError,
} from '../actions'
import AdventureCheckpoint from './AdventureCheckpoint'

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
    const errorMessage = error ? (
      <div>
        <p className="error-message">{error.message}</p>
      </div>
    ) : null

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
        <AdventureEnding
          node={currentNode}
          restart={() => this.restart(adventure.id)}
        />
      )
    }

    else {
      return (
        <AdventureCheckpoint
          node={currentNode}
          error={errorMessage}
          chooseAnswer={(pointerId) => this.updateNode(pointerId)}
        />

      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.student.error,
    adventure: state.student.adventure,
    currentNode: state.student.currentNode,
  }
}

export default connect(mapStateToProps)(StudentDisplay)
