import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../redux/reducers";
import KanbanBoard from "../components/kanban/KanbanBoard";
import { Board } from "../redux/actions";

interface BoardsProps {
  boards: Board[];
}

export const Boards: React.FC<BoardsProps> = ({ boards }) => {
  return (
    <div className='Boards'>
      {boards.map((board) => (
        <KanbanBoard board={board} />
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

export default connect(mapStateProps)(Boards);
