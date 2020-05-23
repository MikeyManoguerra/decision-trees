import React from 'react'
import { connect } from 'react-redux'
import { getStudentAdventure } from '../../actions/student'
import Card from './Card'

function SearchResults(props) {
  const handleClick = (id, query) => {
    props.dispatch(getStudentAdventure(id, query))
  }

  const adventures = props.results ? props.results.map((adventure) => {
    return (
      <Card
        key={adventure.id}
        adventure={adventure}
        handleClick={handleClick}
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


const mapStateToProps = (state) => {
  return {
    results: state.student.searchResults,
  }
}

export default connect(mapStateToProps)(SearchResults)
