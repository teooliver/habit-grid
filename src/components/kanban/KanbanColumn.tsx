import React from "react";
import { KanbanCard } from "./KanbanCard";
import { Issue } from "../../redux/actions";

interface KanbanColumnProps {
  title: string;
  issues: Issue[];
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
