import React, { useCallback, useEffect, useRef } from 'react';
import { editIssueStatus, Column } from '../../redux/actions';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/reducers';

interface CardDropdownProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editIssueStatus: (cardId: number, columnId: number) => void;
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

  const handleClickOutside: Function = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        cardDropDownRef.current != null &&
        !cardDropDownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      } else {
        return;
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    document.addEventListener('click', (e) => handleClickOutside(e));
    return () => {
      document.removeEventListener('click', (e) => handleClickOutside(e));
    };
  }, [handleClickOutside]);

  //TODO: This is being repeated on  KanbanBoard and KanbanCard, need to extract it to just on place, maybe a selector?
  const getColumnName = (id: number) => {
    const foundObj = columns.find((col) => {
      if (col.id === id) return col.title;
    });
    if (foundObj) {
      return foundObj.title;
    }
  };

  return (
    <ul
      ref={cardDropDownRef}
      className="dropdown-list"
      data-testid="dropdown-list"
    >
      {boardColumnsIds.length > 0 &&
        boardColumnsIds.map((columnId) => (
          <li
            key={columnId}
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
