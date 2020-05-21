/*
This component handles display of the current/selected (parent) node editing functionality
It can show either type of edit form (checkpoint or ending)
Or delete functionality
*/

import React, { Fragment } from 'react';

import Button from '../../button'
import UpdateEndingNode from './UpdateEndingNode';
import DeletePrompt from '../../Teacher/DeletePrompt'
import UpdateCheckpointNode from './UpdateCheckpointNode'

export default function ParentForms(props) {
  const {
    node,
    isDeleting,
    toggleForm,
    deleteNode,
    toggleDelete,
  } = props


  const updateForm = (
    <div className='current-node-brancher'>
      {node.isEnding ? <UpdateEndingNode /> : <UpdateCheckpointNode />}
    </div>
  )
  return (
    <Fragment>
      <h2>This Checkpoint: {node.title ? node.title : node.question}</h2>
      {isDeleting ? (
        <DeletePrompt
          handleDelete={deleteNode}
          handleCancel={toggleDelete}
        >
          <h3>Are you sure you want to permanently delete this Node?</h3>
        </DeletePrompt>)
        : updateForm}
      {!isDeleting && (
        <div className="delete-panel">
          <Button
            onClick={toggleForm}
            text='Cancel'
          />
          <Button
            className="delete-button"
            onClick={toggleDelete}
            text='Delete'
          />
        </div >
      )}
    </Fragment>)
}
