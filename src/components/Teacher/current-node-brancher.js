import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { nodeFormWithPointer, setCurrentNode } from '../../actions/nodes';
import { toggleUpdateForm } from '../../actions/nodes'
import { toggleOnboarding } from '../../actions/auth'
import RequiresLogin from '../requires-login';
import ParentForms from '../Forms/Node/ParentForms';
import NodeBranch from './NodeBranch'

export class CurrentNodeBrancher extends React.Component {
  // if (!props.loggedIn) {
  //   return <Redirect to="/" />;
  // }
  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding())
  }

  defineParentPointerForNewNode(parentInt) {
    return this.props.dispatch(nodeFormWithPointer(parentInt))
  }

  editClicked() {

    let currentNode = this.props.currentNode
    this.props.dispatch(toggleUpdateForm(currentNode))
  }


  changeCurrentNode(value) {
    let node = this.props.adventure.nodes.find(node => node.id === value);
    this.props.dispatch(setCurrentNode(node))
  }

  nodeInfoViaPointer(pointer) {
    if (!pointer) return null;
    const node = this.props.adventure.nodes.find(node => node.id === pointer);
    const titleOrQuestion = node.title ? node.title : node.question;
    return titleOrQuestion.slice(0, 50);

  }

  render() {
    let answerA;
    let answerB;
    let answerC;
    let answerD;

    let currentNode = this.props.currentNode

    const options = this.props.adventure.nodes.map((node, index) =>
      <option key={index} label={node.title} value={node.id}>{node.title ? node.title : node.question}</option>);



    if (currentNode.answerA) {
      answerA = (
        <NodeBranch
          id={currentNode.id}
          name='pointerA'
          answer={currentNode.answerA}
          pointer={currentNode.pointerA}
          child={this.nodeInfoViaPointer(currentNode.pointerA)}
          onClick={() => this.defineParentPointerForNewNode(1)}
        />)
    }

    if (currentNode.answerB) {
      answerB = (<NodeBranch
        id={currentNode.id}
        name='pointerB'
        answer={currentNode.answerB}
        pointer={currentNode.pointerB}
        child={this.nodeInfoViaPointer(currentNode.pointerB)}
        onClick={() => this.defineParentPointerForNewNode(2)}
      />)
    }
    if (currentNode.answerC) {
      answerC = (<NodeBranch
        id={currentNode.id}
        name='pointerC'
        answer={currentNode.answerC}
        pointer={currentNode.pointerC}
        child={this.nodeInfoViaPointer(currentNode.pointerC)}
        onClick={() => this.defineParentPointerForNewNode(3)}
      />)
    }
    if (currentNode.answerD) {
      answerD = (<NodeBranch
        id={currentNode.id}
        name='pointerD'
        answer={currentNode.answerD}
        pointer={currentNode.pointerD}
        child={this.nodeInfoViaPointer(currentNode.pointerD)}
        onClick={() => this.defineParentPointerForNewNode(4)}
      />)
    }

    if (!this.props.showUpdate) {
      return (
        <div className="current-node-brancher">
          <div className="node-select">
            <span className="select-label">Current Node:</span>
            <select
              className="node-select-element"
              label="Current Question"
              name="nodeSelect"
              options={options}
              value={this.props.currentNode.id}
              onChange={e => this.changeCurrentNode(e.target.value)}>{options}
            </select>
          </div>
          <div className='brancher-question'>
            <h3><span>This Node's Prompt:  </span>{currentNode.question}</h3>
          </div>
          <div id="branches-container">
            <div className="brancher-answer-container">
              <div className='brancher-answer'><h4>User Choice</h4></div>
              <div className='brancher-pointer'>
                <h4>Leads To</h4>
              </div>
            </div>
            {answerA}
            {answerB}
            {answerC}
            {answerD}
          </div>
          <button className="edit-current-node"
            onClick={() => this.editClicked()}>Edit This Node's Text</button>

          <div className='brancher-analytics'>
            {/* TODO: add the parents that point to this node here? */}
            <p>{currentNode.count ? `This Checkpoint has been visited ${currentNode.count} times` : ""}</p>
          </div>
        </div>
      )
    } else {
      return (
        <ParentForms />
      )
    }
  }
}

const mapStateToProps = (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
  adventureId: state.adventure.adventureId,
  adventure: state.adventure.currentAdventure,
  currentNode: state.node.currentNode,
  showUpdate: state.node.showUpdate,
  onboarding: state.auth.onboarding
});

export default withRouter(RequiresLogin()(connect(mapStateToProps)(CurrentNodeBrancher)));