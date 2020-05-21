/*
This component handles display of the current/selected (parent) node editing functionality
It can show either type of edit form (checkpoint or ending)
Or delete functionality
*/

import React, { Fragment } from 'react'

import Button from '../../button'
import CheckpointForm from './CheckpointForm'
import UpdateEndingNode from './EndingForm'
import DeletePrompt from '../../Teacher/DeletePrompt'

export default function ParentForms(props) {
  const { node, isDeleting, toggleForm, deleteNode, updateNode, toggleDelete } = props

  const submitCheckpointUpdate = (values) => {
    const { title, question, answerA, answerB, answerC, answerD, videoURL, textContent } = values

    const updatedNode = {
      title,
      answerA,
      answerB,
      answerC,
      answerD,
      videoURL,
      question,
      textContent,
      ending: false,
      nodeId: node.id,
    }

    updateNode(updatedNode)
  }

  const submitEndingUpdate = (values) => {
    const { title, videoURL, textContent } = values

    const nodeUpdates = {
      title,
      videoURL,
      textContent,
      ending: true,
      nodeId: node.id,
    }

    updateNode(nodeUpdates)
  }

  const updateForm = (
    <div className="current-node-brancher">
      {node.ending ? (
        <UpdateEndingNode useValues onSubmit={(values) => submitEndingUpdate(values)} />
      ) : (
        <CheckpointForm useValues onSubmit={(values) => submitCheckpointUpdate(values)} />
      )}
    </div>
  )
  return (
    <Fragment>
      <h2>This Checkpoint: {node.title ? node.title : node.question}</h2>
      {isDeleting ? (
        <DeletePrompt handleDelete={deleteNode} handleCancel={toggleDelete}>
          <h3>Are you sure you want to permanently delete this Node?</h3>
        </DeletePrompt>
      ) : (
        updateForm
      )}
      {!isDeleting && (
        <div className="delete-panel">
          <Button onClick={toggleForm} text="Cancel" />
          <Button className="delete-button" onClick={toggleDelete} text="Delete" />
        </div>
      )}
    </Fragment>
  )
}
