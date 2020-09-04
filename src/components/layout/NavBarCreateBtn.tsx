import React from 'react';
import { useLocation } from 'react-router-dom';

interface NavBarCreateBtnProps {}

export const NavBarCreateBtn: React.FC<NavBarCreateBtnProps> = ({}) => {
  const { pathname } = useLocation();

  return (
    <div className="NavBarCreateBtn">
      {pathname === '/kanban' ? (
        <button>Create Board</button>
      ) : (
        <button>Create Habit</button>
      )}
    </div>
  );
};
