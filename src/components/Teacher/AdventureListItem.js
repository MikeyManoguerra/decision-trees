import React from 'react'
import { Link } from 'react-router-dom'

function AdventureListItem(props) {
  return (
    <li >
      <Link
        className="li-adventure"
        to={{
          pathname: `/adventure/${props.adventure.id}`,
        }}>{props.adventure.title}</Link>
    </li>
  )
}

export default AdventureListItem
