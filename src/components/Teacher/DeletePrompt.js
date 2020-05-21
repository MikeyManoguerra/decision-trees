import React from 'react';
import Button from '../button'

export default function DeletePrompt(props) {

  const { handleCancel, handleDelete, children } = props;
  return (
    <div className="confirm-delete-adventure">
      {children}
      <div className="buttons">
        <Button
          className='delete-button'
          onClick={handleDelete}
          text='Delete'
        />
        <Button
          onClick={handleCancel}
          text='Keep'
        />
      </div>
    </div>
  )
}
