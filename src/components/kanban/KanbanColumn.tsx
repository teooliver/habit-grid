import React from 'react';
import KanbanCard from './KanbanCard';
import { Issue } from '../../redux/actions';
import { KanbanCardForm } from './KanbanCardForm';

interface KanbanColumnProps {
  title: string;
  issues: Issue[];
  firstColumn?: boolean;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  issues,
  firstColumn,
}) => {
  return (
    <div className="KanbanColumn">
      <h1 className="KanbanColumn__title">{title}</h1>
      <div className="KanbanColumn__issues">
        {issues &&
          issues.map((issue) => (
            <KanbanCard
              title={issue.title}
              description={issue.description}
              columnId={issue.columnId}
              id={issue.id}
            />
          ))}
        {firstColumn && <KanbanCardForm />}
      </div>
    </div>
  );
};
