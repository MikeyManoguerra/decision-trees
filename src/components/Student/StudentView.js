import React from 'react'
import { connect } from 'react-redux'

import CodeForm from './CodeForm'
import SearchResults from './SearchResults'
import AdventureSearch from './AdventureSearch'
import AdventureDisplay from './AdventureDisplay'
import { getStudentAdventure, getStudentAll, endStudentAdventure } from "../../actions/student"

export class StudentView extends React.Component {
  componentDidMount() {
    this.props.dispatch(endStudentAdventure())
    this.props.dispatch(getStudentAll())
  }


  getAdventureByCode({ code, password }) {
    this.loadAdventure(code, password)
  }

  loadAdventure(id, password) {
    this.props.dispatch(getStudentAdventure(id, password))
  }

  render() {
    const { results, loading, adventure, error } = this.props

    if (loading) {
      return <div className="loading">loading...</div>
    }
    else if (adventure !== null) {
      return <AdventureDisplay />
    } else {
      return (
        <div className="student-landing">
          <div id="student-navigation-options">
            {error && <div className="form-error">{error.message}</div>}
            <CodeForm handleSubmit={(data) => this.getAdventureByCode(data)} />
            <AdventureSearch />
          </div>
          <SearchResults
            results={results}
            loadAdventure={(id, password) => this.loadAdventure(id, password)}
          />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.student.error,
    loading: state.student.loading,
    adventure: state.student.adventure,
    results: state.student.searchResults,
  }
}

export default connect(mapStateToProps)(StudentView)
