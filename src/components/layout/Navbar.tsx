import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import GearIcon from './icons/GearIcon';
import VerticalSlideMenu from './VerticalSlideMenu';
import { NavLink } from 'react-router-dom';
import { colors } from '../../utils/constants';
import { NavBarCreateBtn } from './NavBarCreateBtn';

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
              <NavLink exact to="/kanban" activeClassName="active">
                Boards
              </NavLink>
            </li>
            <li>
              <NavBarCreateBtn />
            </li>
          </ul>
          <span
            className="navbar-control"
            onClick={() => setIsVerticalMenuOpen(true)}
          >
            <GearIcon className="gear-icon" />
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
