import React, { useState } from 'react'

export default function Card(props) {
  const [query, setQuery] = useState('')

  const { adventure, handleClick } = props

  const pass = adventure.hasPassword ? (
    <div>
      <input
        type="password"
        className=" password-input-field"
        onChange={(e) => setQuery(e.target.value)}
        aria-label="password required"
        placeholder="password"
        value={query}
      />
    </div>
  ) : null

  return (
    <li className="adventure-list-item" >
      <p>
        Title: <strong>{adventure.title}</strong>
      </p>
      {pass}
      <button onClick={() => handleClick(adventure.id, query)}>
        Click to start
      </button>
    </li>
  )


}

