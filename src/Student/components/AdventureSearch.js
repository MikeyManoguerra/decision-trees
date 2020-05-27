import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getStudentSearch } from '../actions'

function AdventureSearch(props) {
  const [query, setQuery] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    props.dispatch(getStudentSearch(query))
  }

  return (
    <div role="search" className="">
      <h3 className="student-landing">
        Otherwise: search by keyword, Or browse the library Below
        </h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="above below" htmlFor="input-field">
          Search By Keyword
          </label>
        <input
          className="search-input"
          placeholder="Example: Making Breakfast"
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          value={query}
        ></input>
        <button className="search-adventures" type="submit">
          Search Adventures
          </button>
      </form>
    </div>
  )
}


export default connect()(AdventureSearch)
