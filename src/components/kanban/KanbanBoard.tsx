import React from "react";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCardProps } from "./KanbanCard";

interface KanbanBoardProps {}

const testTodos: KanbanCardProps[] = [
  {
    id: 1,
    title: "Read Something",
    description: "Read Something for school project",
  },
  {
    id: 2,
    title: "Read Something",
    description: "Read Something for school project",
  },
  {
    id: 3,
    title: "Read Something",
    description: "Read Something for school project",
  },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({}) => {
  return (
    <div className='KanbanBoard'>
      <KanbanColumn title='Todo' issues={testTodos} />
      <KanbanColumn title='In Progress' issues={testTodos} />
      <KanbanColumn title='Done' issues={testTodos} />
    </div>
  );
};
