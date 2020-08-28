import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../redux/reducers";
import KanbanBoard from "../components/kanban/KanbanBoard";
import { Board } from "../redux/actions";

interface BoardsProps {
  boards: Board[];
}

const Boards: React.FC<BoardsProps> = ({ boards }) => {
  console.log("kanban,am", boards);
  return (
    <div className='Boards'>
      {boards.map((board) => (
        <KanbanBoard board={board} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ kanban }: StoreState) => {
  console.log("kambana", kanban);
  return {
    boards: kanban,
  };
};

export default connect(mapStateToProps)(Boards);
