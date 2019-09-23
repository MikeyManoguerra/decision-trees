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
      className='pointer-button'
      onClick={props.onClick}
      text='Add a Pointer'
    />
  );

  const childText = props.child ? props.child.concat(' ') :null
  const pointerChild = (
    <div className=" pointer-box">
      <p className="child-answer">
        {childText}
      <span><button
        className='remove-pointer-button'
        onClick={() => handleRemovePointer(props)}
      >Remove</button></span>

</p>
    </div>
  )

  return (
    <div className='brancher-answer-container'>
      <div className='brancher-answer'><p>{props.answer}</p></div>
      <div className="brancher-arrow"><p>></p></div>
      <div className='brancher-pointer'>
        {props.pointer ? pointerChild : availablePointer}
      </div>
    </div>)
}

export default connect()(NodeBranch)