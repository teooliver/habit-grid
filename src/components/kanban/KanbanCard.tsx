import React, { useState } from "react";
import CardDropdown from "./CardDropdown";

export interface KanbanCardProps {
  title?: string;
  id?: number;
  description?: string;
  columnId?: number;
  boardId?: number;
  boardColumns?: number[];
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  title,
  description,
  id,
  columnId = 1,
  boardColumns = [1, 2, 3],
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className='KanbanCard'>
      {title && <h1 className='KanbanCard__title'>{title}</h1>}
      {description && <p className='KanbanCard__description'>{description}</p>}

      <div className='KanbanCard__dropdown'>
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {columnId}
        </button>
        {isDropdownOpen && (
          <CardDropdown
            setIsOpen={setIsDropdownOpen}
            cardId={id!}
            boardColumns={boardColumns.filter((col) => col !== columnId)}
          />
        )}
      </div>
    </div>
  );
};
