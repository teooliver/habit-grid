import { createSelector } from "reselect";
import { Board } from "../actions";
import { StoreState } from "../reducers";

// Create select functions the pick off the pieces of state
// we care about for this calculation

export const groupBy = <T>(
  array: Array<T>,
  property: (x: T) => string
): { [key: string]: Array<T> } =>
  array.reduce((memo: { [key: string]: Array<T> }, x: T) => {
    if (!memo[property(x)]) {
      memo[property(x)] = [];
    }
    memo[property(x)].push(x);
    return memo;
  }, {});

export default groupBy;

const boardSelector = (state: StoreState) => {
  return state.boards;
};

// groupBoardIssuesByCollumn
const grouped = (boards: Board[]) =>
  boards.map((board) => {
    return groupBy(board.issues, (issue) => issue.column);
  });

console.log("Grouped", grouped);

// console.log(initialState);

export const issuesGroupedByColumnSelector = createSelector(
  boardSelector,
  grouped
);
