import React from 'react'

export default function AdventureCheckpoint({ node, chooseAnswer, error }) {
  return (
    <div className="student-display">
      {node.videoURL &&
        <iframe
          title="node-video"
          width="420"
          height="315"
          src={node.videoURL}
        />
      }
      <div id="description-question-box">
        <p className="student-content">{node.textContent}</p>
        <strong>
          <p className="student-question">{node.question}</p>
        </strong>
      </div>
      {error}
      <br />
      {node.answerA && (
        <button
          className="answer-button"
          onClick={() => chooseAnswer(node.pointerA)}
        >
          {node.answerA}
        </button>
      )}
      <br />
      {node.answerB && (
        <button
          className="answer-button"
          onClick={() => chooseAnswer(node.pointerA)}
        >
          {node.answerB}
        </button>
      )}
      <br />
      {node.answerC && (
        <button
          className="answer-button"
          onClick={() => chooseAnswer(node.pointerA)}
        >
          {node.answerC}
        </button>
      )}
      <br />
      {node.answerD && (
        <button
          className="answer-button"
          onClick={() => chooseAnswer(node.pointerA)}
        >
          {node.answerD}
        </button>
      )}
      <br />
    </div>
  )
}
