import React from 'react';
import { Link } from 'react-router-dom';

export default function WrongTurn() {
  return (
    <div className="wrong-turn">
      <h2>Oops! Looks like you took a wrong turn.</h2>
      <Link to={'/'}>Home</Link>
    </div>
  );
}

