import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from '../requires-login';
import { deleteNode } from '../../actions/nodes';

export class DeleteNode extends React.Component {

  onClickDelete() {
    let nodeId = this.props.currentNodeId;
    let adId = this.props.adventureId;
    return this.props.dispatch(deleteNode(adId, nodeId))
  }

  render() {
    return (<div className="current-node-brancher">
      <h3>Are you sure you want to delete this Checkpoint?</h3>
      {/* {error} */}
      <div className="buttons">
        <button
          className=" on-left delete-button"
          type='button'
          onClick={id => this.onClickDelete(id)}
        >Delete It
  </button>
        <button
          className="keep-it on-right"
          type='button'
          onClick={() => this.toggleNodeDeleting()}
        >Keep It
  </button>
      </div>
    </div>)
  }
}

const mapStateToProps = state => {

  return {
    currentNode: state.node.currentNode,
    currentNodeId: state.node.currentNode.id,
    adventureId: state.adventure.currentAdventure.id,
  };
};

export default RequiresLogin()(connect(mapStateToProps)(DeleteNode));