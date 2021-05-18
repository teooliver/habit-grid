import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import KanbanCard from '../KanbanCard';

const initialState = {
  alerts: [],
  habits: [],
  boards: [{ name: 'test-board', columnnIds: [1, 2, 3], id: 1 }],
  columns: [
    { title: 'Todo', boardId: 1, id: 1 },
    { title: 'In Prog', boardId: 1, id: 2 },
    { title: 'Done', boardId: 1, id: 3 },
  ],
  issues: [
    { title: 'fsdfs', description: 'fsdfsdf', boardId: 1, columnId: 3, id: 1 },
  ],
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore(initialState);

describe('Test KanbanCard Component', () => {
  test('Can render Card', () => {
    const Wrapper = () => {
      return (
        <Provider store={store}>
          <KanbanCard
            title="test-title"
            description="test-description"
            id={1234}
            columnId={1}
            boardId={1}
            boardColumnsIds={[1, 2, 3]}
          />
        </Provider>
      );
    };

    const { getByText } = render(<Wrapper />);

    expect(getByText('test-title'));
    expect(getByText('test-description'));
  });

  test('Can Open Dropdown Card', () => {
    const Wrapper = () => {
      return (
        <Provider store={store}>
          <KanbanCard
            title="test-title"
            description="test-description"
            id={1234}
            columnId={1}
            boardId={1}
            boardColumnsIds={[1, 2, 3]}
          />
        </Provider>
      );
    };

    const { getByTestId, getByText } = render(<Wrapper />);

    const dropdownBtn = getByText('Move To:');

    fireEvent.click(dropdownBtn);

    expect(getByTestId('dropdown-list')).toBeInTheDocument();

    expect(getByText(/In Prog/i));
    expect(getByText(/Done/i));
  });
});
