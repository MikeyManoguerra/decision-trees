

import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from '../requires-login';

export class Analytics extends React.Component {

  render() {
    let finishCount = 0;
    const dataArray = this.props.currentAdventure.nodes.map(node => {
      finishCount = node.ending && node.count ? finishCount + node.count : finishCount
      return (<li key={node.id}>
        <p>"{node.title ? node.title : node.question}"
          <span>  visits:  {node.count ? node.count : 0}</span>
        </p>
      </li>)
    })

    return (
      <div className="analytics">
        <h3>Analytics</h3>
        <p>Adventures Start Count: {this.props.currentAdventure.count}
        </p>
        <p>Adventures Completion Count: {finishCount}
        </p>
     
        <ul className="analytics-list">
          {dataArray}
        </ul>
        <p>
          Way to build an awesome Adventure, <span>{this.props.name}</span>!
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    currentAdventure: state.adventure.currentAdventure,
    loading: state.adventure.loading,
  };
};

export default RequiresLogin()(connect(mapStateToProps)(Analytics));
