import React, { useState } from 'react';
import CardDropdown from './CardDropdown';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/reducers';
import { Column } from '../../redux/actions';
import { removeIssue } from '../../redux/actions';
import CloseIcon from '../layout/icons/CloseIcon';
import ChevronDownIcon from '../layout/icons/ChevronDownIcon';

export interface KanbanCardProps {
  title?: string;
  id?: number;
  description?: string;
  columnId?: number;
  boardId?: number;
  boardColumnsIds: number[];
  columns: Column[];
  removeIssue: Function;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  title,
  description,
  id,
  columnId,
  boardColumnsIds,
  columns,
  removeIssue,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //TODO: This is being repeted on  KanbanBoard and KanbanCard, need to stract in just on place, porbably a selector
  const getColumnName = (id: number) => {
    const foundObj = columns.find((col) => col.id === id);
    if (foundObj) {
      return foundObj.title;
    }
  };

  return (
    <div className="KanbanCard">
      {title && <h1 className="KanbanCard__title">{title}</h1>}
      {description && <p className="KanbanCard__description">{description}</p>}
      <button className="remove-card" onClick={() => removeIssue(id)}>
        <CloseIcon className="close-icon" />
      </button>
      <div className="KanbanCard__dropdown">
        <button
          className="dropdown-btn"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {/* {getColumnName(columnId!)} */}
          <span>Move To:</span> <ChevronDownIcon />
        </button>
        {isDropdownOpen && (
          <CardDropdown
            setIsOpen={setIsDropdownOpen}
            cardId={id!}
            boardColumnsIds={boardColumnsIds!.filter((col) => col !== columnId)}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ columns }: StoreState) => {
  return {
    columns,
  };
};

export default connect(mapStateToProps, { removeIssue })(KanbanCard);
