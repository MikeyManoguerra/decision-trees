import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/button'
import Analytics from './Analytics'

export default function AdventureDetails(props) {
  const { adventure } = props

  const [isAnalyzing, setAnalyzing] = useState(false)

  const nodeVideo = adventure && adventure.startVideoURL ? (
    <div>
      <h3 className="info-category">Opening Video</h3>
      <iframe title="node-video" width="420" height="315" src={adventure.startVideoURL} />
    </div>
  ) : null

  return adventure ? (
    <div id="adventure-info">
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
        <div className="temp">
          <Link to={`/adventure/${adventure.id}/build/`}>Build</Link>
        </div>
        <div className="temp">
          <Link to={`/adventure/${adventure.id}/edit/`}>Edit</Link>
        </div>
        <div className="temp">
          <Link to={`/adventure/${adventure.id}/delete/`}>delete</Link>
        </div>
        <Button
          onClick={() => setAnalyzing(!isAnalyzing)}
          text={isAnalyzing ? 'Hide' : 'Analytics'}
        />
      </div>
      {isAnalyzing && <Analytics />}
    </div>
  ) : (
      <div>loading...</div>
    )
}
