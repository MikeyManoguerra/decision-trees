import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from '../requires-login';
import { toggleChildType, stageChildNode, linkNodesById } from '../../actions/nodes'
import { getAnswerTextFromParentInt } from '../../utils/index'

export class ExistingNodeSelector extends React.Component {

  componentDidMount() {
    const currentNodeRemoved = this.filterCurrentNodeFromPotentialChildren()
    //  this dispatch blocks against staged child node being null, and if there is only one value
    //  to select from, you cannot select it.
    this.props.dispatch(stageChildNode(currentNodeRemoved[0]))
  }

  filterCurrentNodeFromPotentialChildren() {
    // adds index to node object to be used after filter
    const nodesWithIndexArray = this.props.currentAdventure.nodes.map((node, index) => {
      const nodeWithIndex = { ...node, index }
      return nodeWithIndex;
    });

    // filters out current node to avoid a node answer pointing to itself
    const currentNodeRemoved = nodesWithIndexArray.filter(node =>
      node.id !== this.props.currentNode.id
    )
    return currentNodeRemoved
  }


  stageSelectedChildNode(index) {
    let node = this.props.currentAdventure.nodes[index];
    this.props.dispatch(stageChildNode(node))

  }

  linkNodes() {
    let idObjectWithParentInt = {
      parentInt: this.props.parentInt,
      parentId: this.props.currentNode.id,
      childId: this.props.stagedChildNode.id,
      adventureId: this.props.currentAdventure.id,
    }

    this.props.dispatch(linkNodesById(idObjectWithParentInt))
  }

  toggleNewOrExistingNodeForm() {
    this.props.dispatch(toggleChildType())
  }

  render() {
    let parentAnswer = getAnswerTextFromParentInt(this.props.parentInt, this.props.currentNode);
    // TODO you do this three times , make it a util
    parentAnswer = parentAnswer.length > 50 ? parentAnswer.slice(0, 50).concat('...') : parentAnswer;

    const currentNodeRemoved = this.filterCurrentNodeFromPotentialChildren()
    // generates JSX of options with values that point to index of itself in currentAdventure.nodes
    const options = currentNodeRemoved.map((node) => {
      if (node.title) {
        return <option key={node.id} label={node.title} value={node.index}>{node.question}</option>
      }
      // this else is temporary(?) until all nodes have titles
      else {
        return <option key={node.id} label={node.question} value={node.index}>{node.question}</option>
      }
    });

    return (
      <div className="form-field">
        <h2 className="existing-node">Use Existing Checkpoint as Pathway</h2>
        <h4>Choice {parentAnswer} will lead to this node.</h4>
        <button
          onClick={() => this.toggleNewOrExistingNodeForm()}
        >
          Create New Checkpoint Instead
        </button>
        <br/>
        <select className="node-select"
          label="Select an existing Checkpoint as the pathway"
          name="nodeSelect"
          options={options}
          onChange={e => this.stageSelectedChildNode(e.target.value)}>{options}</select>
        <button
          onClick={() => this.linkNodes()}
        >
          Create Connection
        </button>

      </div>


    )
  }
}

const mapStateToProps = state => {

  return {
    parentInt: state.node.parentInt,
    loading: state.adventure.loading,
    parentId: state.node.currentNode.id,
    currentNode: state.node.currentNode,
    username: state.auth.currentUser.username,
    stagedChildNode: state.node.stagedChildNode,
    adventureId: state.adventure.currentAdventure.id,
    currentAdventure: state.adventure.currentAdventure,
  };
};

export default RequiresLogin()(
  connect(mapStateToProps)(ExistingNodeSelector)
  );
