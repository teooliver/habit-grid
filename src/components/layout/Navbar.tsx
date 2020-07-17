import React, { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import GearIcon from "./icons/GearIcon";
import VerticalSlideMenu from "./VerticalSlideMenu";

const Navbar = () => {
  const [isVerticalMenuOpen, setIsVerticalMenuOpen] = useState(false);

  const verticalMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.addEventListener("click", (e) => handleClickOutside(e));
    return () => {
      document.removeEventListener("click", (e) => handleClickOutside(e));
    };
  }, []);

  const handleClickOutside: Function = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      verticalMenuRef.current != null &&
      !verticalMenuRef.current.contains(e.target)
    ) {
      setIsVerticalMenuOpen(false);
    } else {
      return;
    }
  };

  return (
    <nav ref={verticalMenuRef} className='Navbar'>
      <div className='navbar-logo'>
        <Logo height='2.5rem' width='2.5rem' backgroundColor='white' />
        <h1 className='hide-on-mobile'>Habit Grid</h1>
      </div>
      <span onClick={() => setIsVerticalMenuOpen(true)}>
        <GearIcon className='navbar-gear-icon' />
      </span>
      <VerticalSlideMenu
        isOpen={isVerticalMenuOpen}
        setIsOpen={setIsVerticalMenuOpen}
      />
    </nav>
  );
};

export default Navbar;
