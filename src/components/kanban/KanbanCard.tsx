import React, { useState } from "react";
import { Issue } from "../../redux/actions";
import { CardDropdown } from "./CardDropdown";

export interface KanbanCardProps {
  title?: string;
  id?: number;
  description?: string;
  column?: string;
  boardId?: number;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  title,
  description,
  id,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className='KanbanCard'>
      {title && <h1 className='KanbanCard__title'>{title}</h1>}
      {description && <p className='KanbanCard__description'>{description}</p>}

      <button
        className='move'
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        Todo
      </button>
      {isDropdownOpen && <CardDropdown setIsOpen={setIsDropdownOpen} />}
    </div>
  );
};
