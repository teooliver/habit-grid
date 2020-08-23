import React from "react";
import { KanbanCardProps, KanbanCard } from "./KanbanCard";

interface KanbanColumnProps {
  title: string;
  issues: KanbanCardProps[];
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  issues,
}) => {
  return (
    <div className='KanbanColumn'>
      <h1 className='KanbanColumn__title'>{title}</h1>
      {issues.map((issue) => (
        <KanbanCard title={issue.title} description={issue.description} />
      ))}
    </div>
  );
};
