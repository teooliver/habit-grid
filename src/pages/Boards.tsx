import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../redux/reducers';
import KanbanBoard from '../components/kanban/KanbanBoard';
import { Board } from '../redux/actions';
import { ReactComponent as ScrumBoardPlaceholder } from '../images/undraw_Scrum_board_re_wk7v.svg';

interface BoardsProps {
  boards: Board[];
}

const Boards: React.FC<BoardsProps> = ({ boards }) => {
  return (
    <div className="Boards" data-testid="boards-test">
      {boards.length !== 0 ? (
        boards.map((board, index) => <KanbanBoard key={index} board={board} />)
      ) : (
        <div className="splash-screen">
          <ScrumBoardPlaceholder />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ boards }: StoreState) => {
  return {
    boards,
  };
};

export default connect(mapStateToProps)(Boards);
