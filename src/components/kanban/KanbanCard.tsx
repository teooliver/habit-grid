import React from "react";

export interface KanbanCardProps {
  title?: string;
  message?: string;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ title, message }) => {
  return (
    <div className='KanbanCard'>
      {title && <h1 className='KanbanCard__title'>{title}</h1>}
      {message && <p className='KanbanCard__message'>{message}</p>}
      <div className='move'>Todo</div>
    </div>
  );
};
