import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from '../requires-login';
import CurrentNodeBrancher from './current-node-brancher';
import { getAdventureById } from '../../actions/createAdventure'
import { setCurrentNode, toggleUpdateForm } from '../../actions/nodes'
import GraphContainer from './graph-container'
import ChildForms from '../Forms/Node/ChildForms';


export class AdventureBuilder extends React.Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getAdventureById(id))
    if (this.props.showUpdate === true) {
      this.props.dispatch(toggleUpdateForm(this.props.currentNode))
    }
  }

  componentWillMount() {
    if (!this.props.currentAdventure) {
      const { id } = this.props.match.params;
      this.props.dispatch(getAdventureById(id))
    }
    else if (!this.props.currentAdventure.head) {
      this.props.history.push('/adventure/headnode')
    }

  }

  changeCurrentNode(value) {
    let node = this.props.currentAdventure.nodes.find(node => node.id === value);
    this.props.dispatch(setCurrentNode(node))
  }

  render() {
    const adventure = this.props.currentAdventure
    let nodeForm = this.props.parentInt ? <ChildForms /> : null;
    if (!adventure || !this.props.currentAdventure.head) {
      return <div className="loading">loading...</div>;
    }

    const options = this.props.currentAdventure.nodes.map((node, index) =>
      <option key={index} label={node.title} value={node.id}>{node.title ? node.title : node.question}</option>);

    return (
      <div id='adventure-builder'>
        <div className='graph-container' >
          <GraphContainer />
        </div>
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
        <CurrentNodeBrancher />
        {nodeForm}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentAdventure: state.adventure.currentAdventure,
    parentInt: state.node.parentInt,
    loading: state.adventure.loading,
    currentNode: state.node.currentNode,
    showUpdate: state.node.showUpdate
  };
};

export default RequiresLogin()(connect(mapStateToProps)(AdventureBuilder));