import React from 'react';
import { connect } from 'react-redux';
import { removePointer } from '../../actions/nodes'

function handleRemovePointer(props) {
  const nodeIdAndPointer = {
    nodeId: props.id,
    [props.name]: props.pointer
  }
  props.dispatch(removePointer(nodeIdAndPointer))
}


export function NodeBranch(props) {

  const availablePointer = (
    <button
      className='brancher-pointer'
      onClick={props.onClick}>
      New Pathway
    </button>
  );

  const pointerChild = (
    <div className='brancher-pointer'
    >
      <p


      >
        {props.child}
      </p>
      <button
        className='brancher-pointer'

        onClick={() => handleRemovePointer(props)}
      // onClick={() => console.log({ [props.name]: props.pointer })}
      >
        remove
      </button>
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