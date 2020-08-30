import React, { useEffect, useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { Board, Issue } from "../../redux/actions";
import groupBy from "../../redux/selectors/columnsFilter";

const issues = [
  {
    id: 1,
    title: "Read Something",
    description: "Read Something for school project",
    boardId: 329840982,
    column: "todo",
  },
  {
    id: 2,
    title: "Read Something",
    description: "Read Something for school project",
    boardId: 329840982,
    column: "todo",
  },
  {
    id: 3,
    title: "Read Something",
    description: "Read Something for school project",
    boardId: 329840982,
    column: "todo",
  },
  {
    id: 4,
    title: "Read Something",
    description: "Read Something for school project",
    boardId: 329840982,
    column: "in progress",
  },
  {
    id: 5,
    title: "Read Something",
    description: "Read Something for school project",
    boardId: 329840982,
    column: "in progress",
  },
  {
    id: 6,
    title: "Read Something",
    description: "Read Something for school project",
    boardId: 329840982,
    column: "in progress",
  },
  {
    id: 7,
    title: "Read Something",
    description: "Read Something for school project",
    boardId: 329840982,
    column: "done",
  },
  {
    id: 8,
    title: "NO BOARD",
    description: "Read Something for school project",
    boardId: 3298409824,
    column: "done",
  },
  {
    id: 9,
    title: "NO BOARD",
    description: "Read Something for school project",
    boardId: 3298409824,
    column: "done",
  },
  {
    id: 10,
    title: "NO BOARD",
    description: "Read Something for school project",
    boardId: 3298409824,
    column: "done",
  },
];

interface KanbanBoardProps {
  board: Board;
  // issues: Issue[];
}

export type GroupedIssues = ReturnType<typeof groupBy>;

const KanbanBoard: React.FC<KanbanBoardProps> = ({ board }) => {
  const [sortedIssues, setSortedIssues] = useState<GroupedIssues>();

  useEffect(() => {
    const filteredIssues = issues.filter((issue) => issue.boardId === board.id);
    let issuesSortedByColumn = groupBy(filteredIssues, (issue) => issue.column);
    console.log(issuesSortedByColumn);
    setSortedIssues(issuesSortedByColumn);
  }, [board, issues]);
  return (
    <div className='KanbanBoard'>
      {board.columnns!.map((col, index) => (
        <KanbanColumn
          title={col}
          issues={
            sortedIssues ? (sortedIssues[col] as Issue[]) : ([] as Issue[])
          }
          firstColumn={index === 0 ? true : false}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
