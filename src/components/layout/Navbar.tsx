import React from "react";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <Logo height="2.5rem" width="2.5rem" backgroundColor="white" />
      <h1>Habit Grid</h1>
    </nav>
  );
};

export default Navbar;
