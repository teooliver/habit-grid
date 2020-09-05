import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../redux/reducers';
import KanbanBoard from '../components/kanban/KanbanBoard';
import { Board, getBoards, getBoardColumns } from '../redux/actions';
import { ReactComponent as ScrumBoardPlaceholder } from '../images/undraw_Scrum_board_re_wk7v.svg';

interface BoardsProps {
  boards: Board[];
  getBoards: Function;
  getBoardColumns: Function;
}

const Boards: React.FC<BoardsProps> = ({ boards, getBoards }) => {
  useEffect(() => {
    getBoards();
  }, []);

  return (
    <>
      <div className="Boards">
        {boards.length !== 0 ? (
          boards.map((board, index) => (
            <KanbanBoard key={index} board={board} />
          ))
        ) : (
          <div className="splash-screen">
            <ScrumBoardPlaceholder />
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = ({ boards }: StoreState) => {
  return {
    boards,
  };
};

export default connect(mapStateToProps, { getBoards, getBoardColumns })(Boards);
