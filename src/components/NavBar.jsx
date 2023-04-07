import * as React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <header>
      <nav className=" h-full bg-slate-700">
        <ul className="flex space-x-4 justify-evenly content-center h-full place-items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/list">List</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
