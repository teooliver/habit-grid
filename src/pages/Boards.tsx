import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../redux/reducers";
import KanbanBoard from "../components/kanban/KanbanBoard";
import { Board } from "../redux/actions";

interface BoardsProps {
  boards: Board[];
}

const Boards: React.FC<BoardsProps> = ({ boards }) => {
  // boardIssues
  return (
    <div className='Boards'>
      {boards.map((board) => (
        <KanbanBoard board={board} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ boards }: StoreState) => {
  return {
    boards,
  };
};

export default connect(mapStateToProps)(Boards);
