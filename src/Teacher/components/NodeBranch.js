import React from 'react'
import Button from '../../components/Button'


export default function NodeBranch(props) {
  const { name, node, child, addChild, removeChild } = props

  const answer = node[`answer${name}`]
  const pointerName = `pointer${name}`
  const pointer = node[pointerName]

  const handleRemovePointer = () => {
    const nodeIdAndPointer = {
      nodeId: node.id,
      [pointerName]: pointer,
    }
    removeChild(nodeIdAndPointer)
  }

  return (
    <div className="NodeBranch">
      <p className="NodeBranch__answer">{answer}</p>
      <div className="brancher-pointer">
        <div className="NodeBranch__pointer">
          {pointer ? (
            <>
              <p className="NodeBranch__child">{child}</p>
              <button className="NodeBranch__remove" onClick={handleRemovePointer}>
                Remove
              </button>
            </>
          ) : (
              <Button className="NodeBranch__add" onClick={addChild} text="Add a Pointer" />
            )}
        </div>
      </div>
    </div>
  )
}
