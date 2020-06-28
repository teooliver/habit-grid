import React from "react";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div
        className="nav-placeholder-icon"
        onClick={() => {
          console.log("navbar icon clicked");
        }}
      ></div>
      <h1>Habit Grid</h1>
    </nav>
  );
};

export default Navbar;
