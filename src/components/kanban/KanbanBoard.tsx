import React, { useEffect, useState } from 'react';
import { KanbanColumn } from './KanbanColumn';
import { Board, Issue, Column } from '../../redux/actions';
import groupBy from '../../redux/selectors/columnsFilter';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/reducers';

interface KanbanBoardProps {
  board: Board;
  issues: Issue[];
  columns: Column[];
}

export type GroupedIssues = ReturnType<typeof groupBy>;

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  board,
  issues,
  columns,
}) => {
  const [sortedIssues, setSortedIssues] = useState<GroupedIssues>();

  useEffect(() => {
    const thisBoardIssues = issues.filter(
      (issue) => issue.boardId === board.id
    );

    let issuesSortedByColumn = groupBy(
      thisBoardIssues,
      (issue) => issue.columnId
    );
    setSortedIssues(issuesSortedByColumn);
    console.log(issuesSortedByColumn);
  }, [board, issues]);

  // This could be a selector and memoazed
  const getColumnName = (id: number) => {
    const foundObj = columns.find((col) => {
      if (col.id === id) return col.title;
    });
    if (foundObj) {
      return foundObj.title;
    }
  };

  return (
    <div className="KanbanBoard">
      {board.columnnIds!.map((colId, index) => (
        <KanbanColumn
          title={getColumnName(colId)!}
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

export default connect(mapStateToProps)(KanbanBoard);
