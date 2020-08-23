import React from "react";
import { Issue } from "../../redux/actions";

export interface KanbanCardProps {
  title?: string;
  description?: string;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  title,
  description,
}) => {
  return (
    <div className='KanbanCard'>
      {title && <h1 className='KanbanCard__title'>{title}</h1>}
      {description && <p className='KanbanCard__description'>{description}</p>}
      <div className='move'>Todo</div>
    </div>
  );
};
