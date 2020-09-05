import React, { useEffect, useRef } from 'react';
import { editIssueStatus, Column } from '../../redux/actions';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/reducers';

interface CardDropdownProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editIssueStatus: Function;
  boardColumnsIds: number[];
  cardId: number;
  columns: Column[];
}

const CardDropdown: React.FC<CardDropdownProps> = ({
  setIsOpen,
  editIssueStatus,
  boardColumnsIds,
  cardId,
  columns,
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

  //TODO: This is being repeted on  KanbanBoard and KanbanCard, need to stract in just on place, porbably a selector
  const getColumnName = (id: number) => {
    const foundObj = columns.find((col) => {
      if (col.id === id) return col.title;
    });
    if (foundObj) {
      return foundObj.title;
    }
  };

  return (
    <ul ref={cardDropDownRef} className="dropdown-list">
      {boardColumnsIds.length > 0 &&
        boardColumnsIds.map((columnId) => (
          <li
            className="menu-item"
            onClick={() => {
              editIssueStatus(cardId, columnId);
              setIsOpen(false);
            }}
          >
            <span>&#62; {getColumnName(columnId)}</span>
          </li>
        ))}
    </ul>
  );
};

const mapStateToProps = ({ columns }: StoreState) => {
  return {
    columns,
  };
};

export default connect(mapStateToProps, { editIssueStatus })(CardDropdown);
