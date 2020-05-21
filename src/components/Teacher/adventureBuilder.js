import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from '../requires-login';
import GraphContainer from './GraphContainer'
import ChildForms from '../Forms/Node/ChildForms';
import CurrentNodeBrancher from './CurrentNodeBrancher';
import { getAdventureById } from '../../actions/adventure'
import { toggleUpdateForm, toggleEnding, toggleChildType } from '../../actions/nodes'

export class AdventureBuilder extends React.Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    const {
      history,
      dispatch,
      adventure,
      showUpdate,
      currentNode,
    } = this.props

    dispatch(getAdventureById(id))

    if (showUpdate) {
      dispatch(toggleUpdateForm(currentNode))
    }

    if (!adventure) {
      dispatch(getAdventureById(id))
    }

    else if (!adventure.head) {
      history.push('/adventure/headnode')
    }
  }

  render() {
    const {
      dispatch,
      isEnding,
      adventure,
      parentInt,
      currentNode,
      useExistingNode
    } = this.props

    if (!adventure || !adventure.head) {
      return <div className="loading">loading...</div>;
    }

    return (
      <div id='adventure-builder'>
        <div className='graph-container'>
          <GraphContainer />
        </div>
        <div className="current-node-brancher">
          <CurrentNodeBrancher />
        </div>
        <div className="form-field">
          <ChildForms
            node={currentNode}
            isEnding={isEnding}
            parentInt={parentInt}
            useExistingNode={useExistingNode}
            toggleChildType={() => dispatch(toggleChildType())}
            toggleIsEnding={() => dispatch(toggleEnding())}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isEnding: state.node.isEnding,
    parentInt: state.node.parentInt,
    loading: state.adventure.loading,
    showUpdate: state.node.showUpdate,
    currentNode: state.node.currentNode,
    adventure: state.adventure.currentAdventure,
    useExistingNode: state.node.useExistingNode,
  };
};

export default RequiresLogin()(
  connect(mapStateToProps)(AdventureBuilder)
);
