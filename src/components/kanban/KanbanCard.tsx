import React, { useState } from "react";
import CardDropdown from "./CardDropdown";

export interface KanbanCardProps {
  title?: string;
  id?: number;
  description?: string;
  column?: string;
  boardId?: number;
  boardColumns?: string[];
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  title,
  description,
  id,
  column = "todo",
  boardColumns = ["todo", "in progress", "done"],
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className='KanbanCard'>
      {title && <h1 className='KanbanCard__title'>{title}</h1>}
      {description && <p className='KanbanCard__description'>{description}</p>}

      <div className='KanbanCard__dropdown'>
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {column}
        </button>
        {isDropdownOpen && (
          <CardDropdown
            setIsOpen={setIsDropdownOpen}
            cardId={id!}
            boardColumns={boardColumns.filter((col) => col !== column)}
          />
        )}
      </div>
    </div>
  );
};
