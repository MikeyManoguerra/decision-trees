import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from '../requires-login';
import { deleteNode, toggleNodeDeleting } from '../../actions/nodes';
import Button from '../button'

export class DeleteNode extends React.Component {

  onClickDelete() {
    let nodeId = this.props.currentNodeId;
    let adId = this.props.adventureId;
    return this.props.dispatch(deleteNode(adId, nodeId))
  }
  toggleNodeDeleting() {
    return this.props.dispatch(toggleNodeDeleting())
  }

  render() {
    return (<div className="current-node-brancher">
      <h3>Are you sure you want to permanently delete this Node?</h3>
      {/* {error} */}
      <div className="buttons">
        <Button
          className='delete-button'
          onClick={id => this.onClickDelete(id)}
          text='Delete'
        />
        <Button
          onClick={() => this.toggleNodeDeleting()}
          text='Keep'
        />
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