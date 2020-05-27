import React from 'react'
import { Link } from 'react-router-dom'

export default function AdventureEnding({ node, restart }) {
  return (
    <section>
      {node.videoURL &&
        <iframe
          title="node-video"
          width="420"
          height="315"
          src={node.videoURL}
        />
      }
      <p className="student-content">{node.textContent}</p>
      <p>Congratulations! This is the end of your Adventure.</p>
      <button
        className="return-to-start"
        onClick={restart}
      >
        Return to Start
    </button>
      <p>
        <strong>
          If you'd like to create your own Adventure,&nbsp;
        <Link to="/registration">click here</Link> to create an account
      </strong>
      </p>
    </section>
  )
}
