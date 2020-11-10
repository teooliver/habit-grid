import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import VerticalSlideMenu from './VerticalSlideMenu';
import { NavLink } from 'react-router-dom';
import ArrowBarLeftIcon from './icons/ArrowBarLeftIcon';

const Navbar = () => {
  const [isVerticalMenuOpen, setIsVerticalMenuOpen] = useState(false);
  const verticalMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.addEventListener('click', (e) => handleClickOutside(e));
    return () => {
      document.removeEventListener('click', (e) => handleClickOutside(e));
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
    <>
      <header ref={verticalMenuRef} className="Navbar">
        <div className="navbar-logo">
          <Logo backgroundColor="white" />
        </div>
        <nav>
          <h1 className="hide-on-mobile">Habit Grid</h1>
          <ul className="nav-links">
            <li>
              <NavLink exact to="/" activeClassName="active">
                Habits
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/boards" activeClassName="active">
                Boards
              </NavLink>
            </li>
          </ul>
          <span
            className="navbar-control"
            onClick={() => setIsVerticalMenuOpen(true)}
          >
            <ArrowBarLeftIcon className="nav-arrow-left-icon" />
            {/* <GearIcon className="gear-icon" /> */}
          </span>
          <VerticalSlideMenu
            isOpen={isVerticalMenuOpen}
            setIsOpen={setIsVerticalMenuOpen}
          />
        </nav>
      </header>
    </>
  );
};

export default Navbar;
