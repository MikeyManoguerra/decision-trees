import React from 'react'
import Card from './Card'


export default function SearchResults({ loadAdventure, results }) {
  const adventures = results ? results.map((adventure) => {
    return (
      <Card
        key={adventure.id}
        adventure={adventure}
        loadAdventure={loadAdventure}
      />
    )
  }) : null

  return (
    <div className="search-results-container">
      <h3>Adventure Library</h3>
      <ul id="search-results-list">{adventures}</ul>
    </div>
  )
}


