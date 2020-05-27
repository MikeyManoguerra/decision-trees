import React from 'react'

export default function AdventureKickoff(props) {
  const { adventure, updateNode, error } = props

  return (
    <div className="student-display">
      <h1>{adventure.title}</h1>
      {error}
      <p>Created by: {adventure.creator}</p>
      <h2>{adventure.startContent}</h2>
      {adventure.startVideoURL &&
        <iframe
          title="starting-video"
          width="420"
          height="315"
          src={adventure.startVideoURL}
        />
      }
      <br />
      <button
        className="embark-button"
        onClick={() => updateNode(adventure.head)}
      >
        Embark
          </button>
    </div>
  )
}


