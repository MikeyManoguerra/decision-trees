import React, { useState } from 'react'

export default function Card(props) {
  const [password, setPassword] = useState('')

  const { adventure, loadAdventure } = props

  const handleLoadAdventure = () => {
    const pass = adventure.hasPassword ? password : null
    loadAdventure(adventure.id, pass)
  }

  const pass = adventure.hasPassword ? (
    <div>
      <input
        type="password"
        className=" password-input-field"
        onChange={(e) => setPassword(e.target.value)}
        aria-label="password required"
        placeholder="password"
        value={password}
      />
    </div>
  ) : null

  return (
    <li className="adventure-list-item" >
      <p>
        Title: <strong>{adventure.title}</strong>
      </p>
      {pass}
      <button onClick={() => handleLoadAdventure()}>
        Click to start
      </button>
    </li>
  )


}

