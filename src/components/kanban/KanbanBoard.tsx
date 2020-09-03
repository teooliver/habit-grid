import React, { useEffect, useState } from 'react';
import KanbanColumn from './KanbanColumn';
import {
  Board,
  Issue,
  Column,
  getBoardColumns,
  getBoards,
} from '../../redux/actions';
import groupBy from '../../redux/selectors/columnsFilter';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/reducers';

interface KanbanBoardProps {
  board: Board;
  issues: Issue[];
  columns: Column[];
  getBoardColumns: Function;
}

export type GroupedIssues = ReturnType<typeof groupBy>;

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  board,
  issues,
  columns,
  getBoardColumns,
}) => {
  const [sortedIssues, setSortedIssues] = useState<GroupedIssues>();

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

  return (
    <div className="KanbanBoard">
      {board.columnnIds!.map((colId, index) => (
        <KanbanColumn
          columnId={colId}
          boardId={board.id}
          key={index}
          title={getColumnName(colId, columns)}
          issues={
            sortedIssues ? (sortedIssues[colId] as Issue[]) : ([] as Issue[])
          }
          firstColumn={index === 0 ? true : false}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ issues, columns }: StoreState) => {
  return {
    issues,
    columns,
  };
};

export default connect(mapStateToProps, { getBoardColumns })(KanbanBoard);
