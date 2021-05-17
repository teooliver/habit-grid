import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppRoutes } from '../../../AppRoutes';
import { createStore, applyMiddleware } from 'redux';
import { reducers } from '../../../redux/reducers';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

jest.mock('../../../indexedDb/connectDb.ts');

//  State object example:
// const initialState = {
//   habits: [],
//   selectedMonthYear: [],
//   selectedView: [],
//   alerts: [],
//   boards: [],
//   issues: [],
//   columns: [],
// };

const initialState = {};
const store = createStore(reducers, initialState, applyMiddleware(thunk));

describe('Test Habit Tracker', () => {
  test('can add new Habits', async () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    const { getByLabelText, getByTestId, getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <AppRoutes />
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId('open-habit-form'));

    expect(getByLabelText('New Habit')).toBeInTheDocument();

    const input = getByLabelText(/new habit/i);
    const submitButton = getByTestId('submit');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      getByText('test');
    });
  });

  test('can remove habit', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <AppRoutes />
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId('habit-name-test'));

    fireEvent.click(getByTestId('delete-test'));
    expect(waitForElementToBeRemoved(getByText('test')));
  });
});
