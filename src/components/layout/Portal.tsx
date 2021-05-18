import React, { useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  setIsModalOpen: Function;
  isModalOpen: boolean;
}

const KEYCODES = {
  ESCAPE: 27,
};

// const portalRoot = document.createElement('div');
// portalRoot.id = 'portal-root';

// const createPortalRootDiv = () => {
//   const portalRoot = document.createElement('div');
//   portalRoot.id = 'portal-root';
//   document.body.append(portalRoot);
// };

export const Portal: React.FC<PortalProps> = ({
  children,
  setIsModalOpen,
  isModalOpen,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside: Function = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (modalRef.current != null && e.target === modalRef.current) {
        setIsModalOpen(false);
      } else {
        return;
      }
    },
    [setIsModalOpen]
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === KEYCODES.ESCAPE && isModalOpen) {
        setIsModalOpen(false);
      }
    },
    [isModalOpen, setIsModalOpen]
  );

  useEffect(() => {
    document.addEventListener('click', (e) => handleClickOutside(e));
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('click', (e) => handleClickOutside(e));
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleClickOutside, handleKeydown]);

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
