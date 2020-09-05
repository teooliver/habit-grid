import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CreateBoardForm from '../kanban/CreateBoardForm';

interface PortalProps {
  // children: React.ReactNode;
  setIsModalOpen: Function;
  isModalOpen: boolean;
}

const KEYCODES = {
  ESCAPE: 27,
};

export const Portal: React.FC<PortalProps> = ({
  children,
  setIsModalOpen,
  isModalOpen,
}) => {
  // const [isOpen, setIsOpen] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', (e) => handleClickOutside(e));
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('click', (e) => handleClickOutside(e));
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleClickOutside: Function = (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    if (modalRef.current != null && e.target === modalRef.current) {
      setIsModalOpen(false);
    } else {
      return;
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.keyCode === KEYCODES.ESCAPE && isModalOpen) {
      setIsModalOpen(false);
    }
  };

  return ReactDOM.createPortal(
    <div
      ref={modalRef}
      className="Portal"
      style={{ display: isModalOpen ? 'flex' : 'none' }}
    >
      <div className="Portal__children">{children}</div>
    </div>,
    document.getElementById('portal-root')!
  );
};
