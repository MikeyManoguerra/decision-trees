import React from 'react';
import { connect } from 'react-redux';
import { removePointer } from '../../actions/nodes'
import Button from '../button'

function handleRemovePointer(props) {
  const nodeIdAndPointer = {
    nodeId: props.id,
    [props.name]: props.pointer
  }
  props.dispatch(removePointer(nodeIdAndPointer))
}


export function NodeBranch(props) {

  const availablePointer = (
    <Button
      className=''
      onClick={props.onClick}
      text='Add a Connection'
    />
  );

  const pointerChild = (
    <div >
      <p>
        {props.child}
      </p>
      <Button
        className=''
        onClick={() => handleRemovePointer(props)}
        text='Remove Connection'
      />
    </div>
  )

  return (
    <div class='brancher-answer-container'>
      <div className='brancher-answer'><p>{props.answer}</p></div>
      <div className='brancher-pointer'>
        {props.pointer ? pointerChild : availablePointer}
      </div>
    </div>)
}

export default connect()(NodeBranch)