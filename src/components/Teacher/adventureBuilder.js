import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from '../requires-login';
import GraphContainer from './GraphContainer'
import ChildForms from '../Forms/Node/ChildForms';
import { toggleUpdateForm } from '../../actions/nodes'
import CurrentNodeBrancher from './CurrentNodeBrancher';
import { getAdventureById } from '../../actions/adventure'


export class AdventureBuilder extends React.Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getAdventureById(id))

    if (this.props.showUpdate) {
      this.props.dispatch(toggleUpdateForm(this.props.currentNode))
    }

    if (!this.props.currentAdventure) {
      const { id } = this.props.match.params;
      this.props.dispatch(getAdventureById(id))
    }

    else if (!this.props.currentAdventure.head) {
      this.props.history.push('/adventure/headnode')
    }
  }

  render() {
    const {
      isEnding,
      adventure,
      parentInt,
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
            isEnding={isEnding}
            parentInt={parentInt}
            useExistingNode={useExistingNode}
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
