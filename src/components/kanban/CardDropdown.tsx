import React, { useEffect, useRef } from 'react';
import { editIssueStatus } from '../../redux/actions';
import { connect } from 'react-redux';

interface CardDropdownProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editIssueStatus: Function;
  boardColumns: number[];
  cardId: number;
}

const CardDropdown: React.FC<CardDropdownProps> = ({
  setIsOpen,
  editIssueStatus,
  boardColumns,
  cardId,
}) => {
  const cardDropDownRef = useRef<HTMLUListElement>(null);

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
      cardDropDownRef.current != null &&
      !cardDropDownRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    } else {
      return;
    }
  };

  return (
    <ul ref={cardDropDownRef} className="dropdown-list">
      {boardColumns.length > 0 &&
        boardColumns.map((column) => (
          <li
            className="menu-item"
            onClick={() => {
              editIssueStatus(cardId, column);
              setIsOpen(false);
            }}
          >
            <span>{column}</span>
          </li>
        ))}
    </ul>
  );
};

export default connect(null, { editIssueStatus })(CardDropdown);
