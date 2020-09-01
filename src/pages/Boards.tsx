import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../redux/reducers';
import KanbanBoard from '../components/kanban/KanbanBoard';
import { Board, getBoards } from '../redux/actions';
import CreateBoardForm from '../components/kanban/CreateBoardForm';

interface BoardsProps {
  boards: Board[];
  getBoards: Function;
}

const Boards: React.FC<BoardsProps> = ({ boards, getBoards }) => {
  useEffect(() => {
    getBoards();
  }, [boards]);
  // boardIssues
  console.log(boards);
  return (
    <>
      <CreateBoardForm />
      <div className="Boards">
        {boards.map((board) => (
          <KanbanBoard board={board} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = ({ boards }: StoreState) => {
  return {
    boards,
  };
};

export default connect(mapStateToProps, { getBoards })(Boards);
