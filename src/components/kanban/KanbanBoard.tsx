import React from "react";
import { KanbanColumn } from "./KanbanColumn";
import { Board } from "../../redux/actions";

interface KanbanBoardProps {
  board: Board;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ board }) => {
  return (
    <div className='KanbanBoard'>
      {board.columnns!.map((col) => (
        <KanbanColumn title={col} issues={board.issues!} />
      ))}
    </div>
  );
};

export default KanbanBoard;
