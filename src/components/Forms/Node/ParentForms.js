/*
This component handles display of the current/selected (parent) node editing functionality
It can show either type of edit form (checkpoint or ending)
Or delete functionality
*/

import React, { Fragment } from 'react';

import Button from '../../button'
import DeleteNode from '../../Teacher/DeleteNode'
import UpdateEndingNode from './UpdateEndingNode';
import UpdateCheckpointNode from './UpdateCheckpointNode'

export default function ParentForms(props) {
  const {
    title,
    isEnding,
    question,
    isDeleting,
    toggleForm,
    toggleDelete,
  } = props

  const updateForm = isEnding ? <UpdateEndingNode /> : <UpdateCheckpointNode />

  return (
    <Fragment>
      <h2>This Checkpoint: {title ? title : question}</h2>
      {isDeleting ? <DeleteNode /> : updateForm}
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
