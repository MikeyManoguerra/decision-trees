import React from 'react';
import Button from '../button'

export default function NodeBranch(props) {
  const {
    name,
    node,
    child,
    addChild,
    removeChild,
  } = props

  const answer = node[`answer${name}`]
  const pointerName = `pointer${name}`
  const pointer = node[pointerName]


  const handleRemovePointer = () => {
    const nodeIdAndPointer = {
      nodeId: node.id,
      [pointerName]: pointer
    }
    removeChild(nodeIdAndPointer)
  }

  return (
    <div className='brancher-answer-container'>
      <div className='brancher-answer'>
        <p>{answer}</p>
      </div>
      <div className="brancher-arrow">
        <p>>&nbsp;</p>
      </div>
      <div className='brancher-pointer'>
        <div className="pointer-box">
          {pointer ? (
            <>
              <p className="child-answer">{child}</p>
              <button
                className='remove-pointer-button'
                onClick={handleRemovePointer}
              >Remove</button>
            </>
          ) : (
              <Button
                className='pointer-button'
                onClick={addChild}
                text='Add a Pointer'
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

