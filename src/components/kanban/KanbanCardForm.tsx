import React from 'react';

interface KanbanCardFormProps {}

export const KanbanCardForm: React.FC<KanbanCardFormProps> = ({}) => {
  return (
    <form className="KanbanCardForm">
      <input placeholder="+ What needs to be done?" />
      <input placeholder="+ Description" />
    </form>
  );
};
