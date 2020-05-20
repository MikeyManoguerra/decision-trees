import React from 'react';

import { Link } from 'react-router-dom';
import { Footer } from './footer'


export default function Home() {
  const imgSrc = require('../images/spider.png');
  return (
    <section className="home-page">
      <div className="home-page-box">
        <div className="welcome-box">
          <h2 className="banner">Build An Adventure <br /> Embark upon a journey of learning! </h2>
          <h3 className="blurb">The knowledge Maze is a tool to build highly customizable, branched, text and video based adventures. Build out the choices and they consequences, and invite others to travel down paths you create!</h3>
        </div>
        <div className="home-div">
          <h3 className="home-div-text"> Are you a Builder ?</h3>
          <p>Start building an adventure.</p>
          <Link to="/login">
            <button
              className="home-button"
              type="button"
            >
              Build
            </button>
          </Link>
          <h3 className="home-div-text">Are you an Adventurer ?</h3>
          <p>Find an Adventure that someone created.</p>
          <Link to="/studentLanding">
            <button
              className="home-button"
              type="button"
            >
              Embark
            </button>
          </Link>
        </div>
      </div>
      <div className="image-container">
        <img src={imgSrc} alt="spiderweb"></img>
      </div>
      <Footer />
    </section>
  )
}
