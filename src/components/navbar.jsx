import React, { Component } from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Dojo Management
        <span className="badge badge-pill badge-secondary"></span>
      </a>
    </nav>
  );
};

export default NavBar;
