import React from 'react';

import { Link } from 'react-router-dom';


export default class Home extends React.Component {

  render() {
    let banner = <h2 className="banner"> Welcome!</h2>;
    let blurb = <h3 className="blurb">LearnVenture is a tool to build fun learning programs that pose unique questions based upon previous choices. You can build the storyline with videos, text, and multiple endings.</h3>
    return (
    <section className="home-page">
      <div className="home-page-box">
        {banner}
        {blurb}
        <div className="home-div col-4">
          <p className="home-div-text">Are you a teacher?<br />If so, or if you'd like to build your own LearnVenture, click the link below to login and begin.</p>
          <Link to="/login">
            <button
              className="home-button on-left wide-button"
              type="button"
            >Teachers</button>
          </Link>
        </div>
        <div className="home-div col-4">
          <p className="home-div-text">Are you a student?<br />If so, or if you'd like to explore public LearnVentures, click the link below to embark on a LearnVenture.</p>
          <Link to="/studentLanding">
            <button
              className="home-button on-left on-right wide-button"
              type="button"
            >Students</button>
          </Link>
        </div>
      </div>
    </section>
    )
  }
}