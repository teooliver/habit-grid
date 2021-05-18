import React from 'react';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import KanbanBoard from '../KanbanBoard';

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

jest.mock('../../../indexedDb/connectDb.ts');

describe('Test KanbanBoard Component', () => {
  test('Can remove Kanban board', () => {
    const Wrapper = () => {
      return (
        <Provider store={store}>
          <KanbanBoard
            board={{ name: 'test-board', columnnIds: [1, 2, 3], id: 1 }}
          />
        </Provider>
      );
    };

    const { getByTestId, queryByTestId } = render(<Wrapper />);

    const removeBtn = getByTestId('remove-board-btn');
    fireEvent.click(removeBtn);

    expect(waitForElementToBeRemoved(queryByTestId('KanbanBoard')));
  });
});
