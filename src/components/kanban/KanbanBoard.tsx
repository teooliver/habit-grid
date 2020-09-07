import React, { useEffect, useState } from 'react';
import KanbanColumn from './KanbanColumn';
import {
  Board,
  Issue,
  Column,
  getBoardColumns,
  removeBoards,
} from '../../redux/actions';
import groupBy from '../../redux/selectors/columnsFilter';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/reducers';
import CloseIcon from '../layout/icons/CloseIcon';

interface KanbanBoardProps {
  board: Board;
  issues: Issue[];
  columns: Column[];
  getBoardColumns: Function;
  removeBoards: Function;
}

export type GroupedIssues = ReturnType<typeof groupBy>;

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  board,
  issues,
  columns,
  getBoardColumns,
  removeBoards,
}) => {
  const [sortedIssues, setSortedIssues] = useState<GroupedIssues>();
  // const [boardIssues, setBoardIssues] = useState<Issue[]>([]);

  useEffect(() => {
    getBoardColumns();

    // Selector
    const thisBoardIssues = issues.filter(
      (issue) => issue.boardId === board.id
    );

    // Selector
    let issuesSortedByColumn = groupBy(
      thisBoardIssues,
      (issue) => issue.columnId
    );
    setSortedIssues(issuesSortedByColumn);
  }, [issues]);

  // This could be a selector and memoazed
  const getColumnName = (id: number, columns: Column[]) => {
    let foundObj = columns.find((col) => col.id === id);

    if (foundObj) {
      return foundObj.title;
    }
    return 'Todo';
  };

  const getColumnIssues = (colId: number) => {
    if (sortedIssues !== undefined) {
      return sortedIssues[colId]
        ? (sortedIssues[colId] as Issue[])
        : ([] as Issue[]);
    }
    return [] as Issue[];
  };

  const getBoardIssuesIds = (board: Board) => {
    const columnIssues = board.columnnIds.map((colId) => {
      return getColumnIssues(colId);
    });
    return columnIssues.flat().map(issue => issue.id)
  };

  return (
    <div className="KanbanBoard">
      <button
        className="remove-board-btn"
        onClick={() => removeBoards(board, getBoardIssuesIds(board).flat())}
      >
        <CloseIcon className="close-icon" />
      </button>
      <section className="KanbanBoardColumns">
        {board.columnnIds!.map((colId, index) => (
          <KanbanColumn
            columnId={colId}
            boardId={board.id}
            boardColumnsIds={board.columnnIds}
            key={index}
            title={getColumnName(colId, columns)}
            issues={getColumnIssues(colId)}
            firstColumn={index === 0 ? true : false}
          />
        ))}
      </section>
    </div>
  );
};

const mapStateToProps = ({ issues, columns }: StoreState) => {
  return {
    issues,
    columns,
  };
};

export default connect(mapStateToProps, { getBoardColumns, removeBoards })(
  KanbanBoard
);
