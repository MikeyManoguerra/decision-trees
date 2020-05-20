import React from 'react';
import { Link } from 'react-router-dom'

import Button from '../button'
import Analytics from './analytics'

export default function AdventureDetails(props) {
  const {
    adventure,
    showAnalytics,
    toggleEdit,
    toggleDelete,
    toggleAnalytics
  } = props

  const nodeVideo = adventure.startVideoURL ? (
    <div>
      <h3 className="info-category">Opening Video</h3>
      <iframe
        title='node-video'
        width="420"
        height="315"
        src={adventure.startVideoURL}
      />
    </div>
  ) : null

  return (
    <div id='adventure-info'>
      <div className="dashboard-title">
        <h2>Adventure Dashboard</h2>
      </div>
      <div className="adventure-details">
        <h2 className="adventure-title">{adventure.title}</h2>
        <h3 className="info-category">Adventure Introduction Text</h3>
        <p>{adventure.startContent}</p>
        <div>{nodeVideo}</div>
        <h3 className="info-category">Starting Scenario</h3>
        <p>{adventure.textContent}</p>
        <h3 className="info-category">Adventure Code:</h3>
        <p>{adventure.id}</p>
        {adventure.hasPassword && <span>This Adventure is password protected</span>}
      </div>
      <div className="adventure-navigator">
        <Link
          to={`/adventure/adventurebuilder/${adventure.id}`}
        >Build</Link>
        <Button
          onClick={toggleEdit}
          text='Edit Info Text'
        />
        <Button
          onClick={toggleDelete}
          text='Delete'
        />
        <Button
          onClick={toggleAnalytics}
          text={showAnalytics ? 'Hide' : 'Analytics'}
        />
      </div>
      {showAnalytics && <Analytics />}
    </div>
  );
}

