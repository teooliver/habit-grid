import React from "react";
import { KanbanColumn } from "./KanbanColumn";
import { Board } from "../../redux/actions";
import { connect } from "react-redux";
import { StoreState } from "../../redux/reducers";

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

const mapStateProps = ({ kanban }: StoreState) => {
  console.log(kanban);
  return {
    boards: kanban,
  };
};

export default connect(mapStateProps)(KanbanBoard);
