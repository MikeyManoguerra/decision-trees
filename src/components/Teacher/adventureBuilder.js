import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from '../requires-login';
import CurrentNodeBrancher from './current-node-brancher';
import { getAdventureById } from '../../actions/createAdventure'
import { toggleUpdateForm } from '../../actions/nodes'
import GraphContainer from './graph-container'
import ChildForms from '../Forms/Node/ChildForms';


export class AdventureBuilder extends React.Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getAdventureById(id))
    if (this.props.showUpdate === true) {
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
    const imgSrc = require('../../images/spider.png')
    const adventure = this.props.currentAdventure
    let nodeForm = this.props.parentInt ? <ChildForms /> : <div className="form-field"><img src={imgSrc} alt="spiderweb"></img></div>;
    if (!adventure || !this.props.currentAdventure.head) {
      return <div className="loading">loading...</div>;
    }

    return (
      <div id='adventure-builder'>
        <div className='graph-container' >
          <GraphContainer />
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