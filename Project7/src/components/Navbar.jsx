import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-dark bg-dark">
    <div className="container justify-content-center">
      <Link className="navbar-brand mx-auto" to="/">🗞 News Aggregator</Link>
    </div>
  </nav>
);

export default Navbar;
