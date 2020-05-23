import React from 'react'
import { connect } from 'react-redux'

import CodeForm from './CodeForm'
import SearchResults from './SearchResults'
import StudentDisplay from './StudentDisplay'
import AdventureSearch from './AdventureSearch'
import { getStudentAdventure, getStudentAll, endStudentAdventure } from "../../actions/student"

export class StudentLanding extends React.Component {
  componentDidMount() {
    this.props.dispatch(endStudentAdventure())
    this.props.dispatch(getStudentAll())
  }

  getAdventureByCode({ code, password }) {
    this.props.dispatch(getStudentAdventure(code, password))
  }

  render() {
    if (this.props.adventure !== null) {
      return <StudentDisplay />
    } else {
      if (this.props.loading) {
        return <div className="loading">loading...</div>
      }
      return (
        <div className="student-landing">
          <div id="student-navigation-options">
            {this.props.error && <div className="form-error">{this.props.error.message}</div>}
            <CodeForm handleSubmit={(data) => this.getAdventureByCode(data)} />
            <AdventureSearch />
          </div>
          <SearchResults />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.student.error,
    loading: state.student.loading,
    results: state.student.results,
    adventure: state.student.adventure,
  }
}

export default connect(mapStateToProps)(StudentLanding)
