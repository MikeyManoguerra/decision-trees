import React from 'react'
import { Link } from 'react-router-dom'

function AdventureListItem(props) {

  return (
    <li key={props.index}>
      <Link
        className="li-adventure"
        to={{
          pathname: `/adventure/${props.adventure.id}`,
        }}>{props.adventure.title}</Link>
      <p>{props.adventure.count ? `This LearnVenture has been visited ${props.adventure.count} times` : ""} </p>
    </li>
  )
}

export default AdventureListItem
