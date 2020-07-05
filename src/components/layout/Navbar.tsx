import React, { useState } from "react";
import Logo from "./Logo";
import GearIcon from "./icons/GearIcon";
import VerticalSlideMenu from "./VerticalSlideMenu";

const Navbar = () => {
  const [isVerticalMenuOpen, setIsVerticalMenuOpen] = useState(false);

  return (
    <nav className="Navbar">
      <div className="navbar-logo">
        <Logo height="2.5rem" width="2.5rem" backgroundColor="white" />
        <h1>Habit Grid</h1>
      </div>
      <span onClick={() => setIsVerticalMenuOpen(true)}>
        <GearIcon className="navbar-gear-icon" />
      </span>
      <VerticalSlideMenu
        isOpen={isVerticalMenuOpen}
        setIsOpen={setIsVerticalMenuOpen}
      />
    </nav>
  );
};

export default Navbar;
