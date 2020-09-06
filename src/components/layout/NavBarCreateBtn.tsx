import React, { useState } from 'react';
import { Portal } from './Portal';
import CreateBoardForm from '../kanban/CreateBoardForm';

interface NavBarCreateBtnProps {}

export const NavBarCreateBtn: React.FC<NavBarCreateBtnProps> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="NavBarCreateBtn">
        <button onClick={() => handleOnClick()}>Create Board</button>
      </div>
      <Portal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <CreateBoardForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Portal>
    </>
  );
};
