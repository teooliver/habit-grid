import React, { useEffect, useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { Board, Issue } from "../../redux/actions";
import groupBy from "../../redux/selectors/columnsFilter";

interface KanbanBoardProps {
  board: Board;
}

export type GroupedIssues = ReturnType<typeof groupBy>;

const KanbanBoard: React.FC<KanbanBoardProps> = ({ board }) => {
  const [issues, setIssues] = useState<GroupedIssues>();

  useEffect(() => {
    let issuesSortedByColumn = groupBy(board.issues, (issue) => issue.column);
    console.log(issuesSortedByColumn);
    setIssues(issuesSortedByColumn);
  }, [board]);
  return (
    <div className='KanbanBoard'>
      {board.columnns!.map((col, index) => (
        <KanbanColumn
          title={col}
          issues={issues ? (issues[col] as Issue[]) : ([] as Issue[])}
          firstColumn={index === 0 ? true : false}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
