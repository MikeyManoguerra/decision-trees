import React from 'react'
import { connect } from 'react-redux'

export class Footer extends React.Component {
  render() {
    return (
      <footer role="contentinfo" className="footer">
        <span>
          Intrested in the code?{' '}
          <a
            href="https://github.com/mikeymanoguerra/decision-trees"
            rel="noopener noreferrer"
            target="_blank"
          >
            Click here!
          </a>
        </span>
      </footer>
    )
  }
}

const mapStateToProps = (state) => ({
  onboarding: state.auth.onboarding,
  loggedIn: state.auth.currentUser !== null,
})

export default connect(mapStateToProps)(Footer)
