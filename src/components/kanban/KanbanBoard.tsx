import React from "react";
import { KanbanColumn } from "./KanbanColumn";
import { Board } from "../../redux/actions";

interface KanbanBoardProps {
  board: Board;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ board }) => {
  return (
    <div className='KanbanBoard'>
      {board.columnns!.map((col, index) => (
        <KanbanColumn
          title={col}
          issues={board.issues!}
          firstColumn={index === 0 ? true : false}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
