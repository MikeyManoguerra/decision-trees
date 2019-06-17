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
      className='brancher-pointer'
      onClick={props.onClick}
      text='New Pathway'
    />
  );

  const pointerChild = (
    <div className='brancher-pointer'>
        <p>
          {props.child}
        </p>
        <Button
          className='brancher-pointer'
          onClick={() => handleRemovePointer(props)}        
          text='remove'
      />
      </div>
      )
    
      return (
    <div className='brancher-answer-container'>
        <div className='brancher-answer'><p>{props.answer}</p></div>
        <div className='brancher-pointer'>
          {props.pointer ? pointerChild : availablePointer};
  
      </div>
      </div>)
  }
  
export default connect()(NodeBranch)