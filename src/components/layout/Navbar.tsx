import React from "react";
import Logo from "./Logo";
import GearIcon from "./icons/GearIcon";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div className="navbar-logo">
        <Logo height="2.5rem" width="2.5rem" backgroundColor="white" />
        <h1>Habit Grid</h1>
      </div>
      <span>
        <GearIcon className="navbar-gear-icon" />
      </span>
    </nav>
  );
};

export default Navbar;
