import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import NodeBranch from './NodeBranch'
import RequiresLogin from '../requires-login';
import ParentForms from '../Forms/Node/ParentForms';

import {
  toggleUpdateForm,
  toggleNodeDeleting,
  nodeFormWithPointer,
  setCurrentNode,
  removePointer
} from '../../actions/nodes';

export class CurrentNodeBrancher extends React.Component {

  changeCurrentNode(value) {
    // use the nodeId from the selected option to find that node in the adventures nodes array.
    this.props.dispatch(
      setCurrentNode(
        this.props.nodes.find(node => node.id === value)
      )
    )
  }

  nodeInfoViaPointer(pointer) {
    // find the child of current node and get the title/question text for display
    if (!pointer) return null;
    const node = this.props.nodes.find(node => node.id === pointer);
    const titleOrQuestion = node.title ? node.title : node.question;

    return titleOrQuestion.slice(0, 50);
  }

  render() {
    const {
      nodes,
      title,
      dispatch,
      question,
      isEnding,
      isDeleting,
      currentNode,
    } = this.props

    const options = nodes.map((node, index) =>
      <option
        key={index}
        label={node.title}
        value={node.id}
      >
        {node.title ? node.title : node.question}
      </option>
    );

    const answerA = currentNode.answerA ? (
      <NodeBranch
        name='A'
        node={currentNode}
        child={this.nodeInfoViaPointer(currentNode.pointerA)}
        addChild={() => dispatch(nodeFormWithPointer(1))}
        removeChild={c => { dispatch(removePointer(c)) }}
      />
    ) : null

    const answerB = currentNode.answerB ? (
      <NodeBranch
        name='B'
        node={currentNode}
        child={this.nodeInfoViaPointer(currentNode.pointerB)}
        addChild={() => dispatch(nodeFormWithPointer(2))}
        removeChild={c => dispatch(removePointer(c))}
      />) : null

    const answerC = currentNode.answerC ? (
      <NodeBranch
        name='C'
        node={currentNode}
        child={this.nodeInfoViaPointer(currentNode.pointerC)}
        addChild={() => dispatch(nodeFormWithPointer(3))}
        removeChild={c => dispatch(removePointer(c))}
      />) : null

    const answerD = currentNode.answerD ? (
      <NodeBranch
        name='D'
        node={currentNode}
        child={this.nodeInfoViaPointer(currentNode.pointerD)}
        addChild={() => dispatch(nodeFormWithPointer(4))}
        removeChild={c => dispatch(removePointer(c))}

      />) : null

    if (!this.props.showUpdate) {
      return (
        <Fragment>
          <div className="node-select">
            <h2 className="select-label">Current Node</h2>
            <select
              options={options}
              name="nodeSelect"
              label="Current Question"
              className="node-select-element"
              value={this.props.currentNode.id}
              onChange={e => this.changeCurrentNode(e.target.value)}
            >
              {options}
            </select>
          </div>
          <div className='brancher-question'>
            <h3>This Node's Prompt: {currentNode.question}</h3>
          </div>
          <div id="branches-container">
            <div className="brancher-answer-container">
              <div className='brancher-answer'>
                <h4 className="brancher-labels">User Choice</h4>
              </div>
              <div className="brancher-arrow"><p></p></div>
              <div className='brancher-pointer pointer-label'>
                <h4 className="brancher-labels">Leads To</h4>
              </div>
            </div>
            {answerA}
            {answerB}
            {answerC}
            {answerD}
          </div>
          <button
            className="edit-current-node"
            onClick={() => dispatch(toggleUpdateForm(currentNode))}
          >
            Edit This Node's Text
          </button>

          <div className='brancher-analytics'>
            {/* TODO: add the parents that point to this node here? */}
            <p>{currentNode.count ? `This Checkpoint has been visited ${currentNode.count} times` : ""}</p>
          </div>
        </Fragment>
      )
    } else {
      return (
        <ParentForms
          title={title}
          question={question}
          isEnding={isEnding}
          isDeleting={isDeleting}
          toggleDelete={() => dispatch(toggleNodeDeleting())}
          toggleForm={() => dispatch(toggleUpdateForm())}
        />
      )
    }
  }
}

const mapStateToProps = (state) => ({
  isEnding: state.node.isEnding,
  showUpdate: state.node.showUpdate,
  isDeleting: state.node.isDeleting,
  title: state.node.currentNode.title,
  currentNode: state.node.currentNode,
  adventureId: state.adventure.adventureId,
  loggedIn: state.auth.currentUser !== null,
  question: state.node.currentNode.question,
  nodes: state.adventure.currentAdventure.nodes,
});

export default withRouter(
  RequiresLogin()(
    connect(mapStateToProps)(CurrentNodeBrancher)
  ));
