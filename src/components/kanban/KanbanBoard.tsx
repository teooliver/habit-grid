import React from "react";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCardProps } from "./KanbanCard";

interface KanbanBoardProps {}

interface CardAttrs extends KanbanCardProps {
  id: string;
}

const testTodos: CardAttrs[] = [
  {
    id: "1",
    title: "Read Something",
    message: "Read Something for school project",
  },
  {
    id: "2",
    title: "Read Something",
    message: "Read Something for school project",
  },
  {
    id: "3",
    title: "Read Something",
    message: "Read Something for school project",
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
