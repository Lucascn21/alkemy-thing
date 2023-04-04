import * as React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <header>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/list">List</Link>
          <Link to="/contact">Contact</Link>
        </ul>
      </nav>
    </header>
  );
};
