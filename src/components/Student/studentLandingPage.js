import React from 'react'
import { connect } from 'react-redux'
import { getStudentAdventure, getStudentAll, endStudentAdventure } from '../../actions/student'
import StudentDisplay from './student-display'
import AdventureSearch from './adventureSearch'
import SearchResults from './searchResults'
let inputVal, error, passwordVal

export class StudentLanding extends React.Component {
  componentDidMount() {
    this.props.dispatch(endStudentAdventure())
    this.props.dispatch(getStudentAll())
  }

  handleSubmit(e) {
    e.preventDefault()
    let adventureId = inputVal
    this.props.dispatch(getStudentAdventure(adventureId, passwordVal))
  }

  onChange(e) {
    inputVal = e.target.value
  }

  onChangePassword(e) {
    passwordVal = e.target.value
  }

  render() {
    if (this.props.adventure !== null) {
      return <StudentDisplay />
    } else {
      if (this.props.loading) {
        return <div className="loading">loading...</div>
      }
      if (this.props.error) {
        error = <div className="form-error">{this.props.error.message}</div>
      }
      return (
        <div className="student-landing">
          <div id="student-navigation-options">
            <div className="register-adventure">
              <h3 className="student-landing">If you have an Adventure Code, enter it here.</h3>
              <form className="below extra-below" onSubmit={(e) => this.handleSubmit(e)}>
                {error}
                <label htmlFor="adventureId">Enter Adventure Code</label>
                <input
                  className="adventure-input"
                  type="text"
                  name="adventureId"
                  id="adventureId"
                  placeholder="5c9ceaeac543f706bf407cae"
                  onChange={(e) => this.onChange(e)}
                ></input>
                <label htmlFor="adventurePass"> Include password if applicable</label>
                <input
                  className="adventure-password"
                  type="password"
                  name="adventurePass"
                  id="adventurePass"
                  onChange={(e) => this.onChangePassword(e)}
                ></input>
                <button className="s" type="submit">
                  Start Adventure
                </button>
              </form>
            </div>
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
    adventure: state.student.adventure,
    error: state.student.error,
    loading: state.student.loading,
    results: state.student.results,
    tutorial: state.student.tutorial,
  }
}

export default connect(mapStateToProps)(StudentLanding)
