import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Portal } from './Portal';
import CreateBoardForm from '../kanban/CreateBoardForm';

interface NavBarCreateBtnProps {}

export const NavBarCreateBtn: React.FC<NavBarCreateBtnProps> = ({}) => {
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="NavBarCreateBtn">
        {pathname === '/kanban' ? (
          <button onClick={() => setIsModalOpen(true)}>Create Board</button>
        ) : (
          <button>Create Habit</button>
        )}
      </div>
      <Portal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <CreateBoardForm />
      </Portal>
    </>
  );
};
