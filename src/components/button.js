import React from 'react'

function ButtonComponent(props) {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.text}
    </button>
  )

}

export default ButtonComponent