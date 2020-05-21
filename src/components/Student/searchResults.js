import React from 'react'
import { connect } from 'react-redux'
import { getStudentAdventure } from '../../actions/student.js'

let passwordVal
export class SearchResults extends React.Component {
  handleClick(id) {
    this.props.dispatch(getStudentAdventure(id.target.value, passwordVal))
  }
  handleChange(e) {
    passwordVal = e.target.value
  }

  render() {
    let adventures
    if (this.props.results) {
      adventures = this.props.results.map((adventure) => {
        let pass
        if (adventure.hasPassword) {
          pass = (
            <div>
              <input
                className=" password-input-field"
                onChange={(e) => this.handleChange(e)}
                type="password"
                aria-label="password required"
                placeholder="
                    password"
              ></input>
            </div>
          )
        }
        return (
          <li className="adventure-list-item" key={adventure.id}>
            <p>
              Title: <strong>{adventure.title}</strong>
            </p>
            {pass}
            <button
              className=""
              value={adventure.id}
              onClick={(e) => {
                this.handleClick(e)
              }}
            >
              Click to start
            </button>
          </li>
        )
      })
    }
    return (
      <div className="search-results-container">
        <h3>Adventure Library</h3>
        <ul id="search-results-list">{adventures}</ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.student.searchResults,
  }
}

export default connect(mapStateToProps)(SearchResults)
