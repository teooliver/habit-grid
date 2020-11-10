import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppRoutes } from '../../AppRoutes';
import { App } from '../../App';
import { createStore, applyMiddleware } from 'redux';
import { reducers } from '../../redux/reducers';
import { getHabits } from '../../redux/actions/habits';
import {
  fireEvent,
  getByLabelText,
  render,
  screen,
  waitForElement,
} from '@testing-library/react';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

jest.mock('../../indexedDb/connectDb.ts');

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

beforeAll(() => {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'portal-root');
  document.body.append(portalRoot);
});

test('can add Habits', async () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  const { getByLabelText, getByTestId, getByText, debug } = render(
    <Provider store={store}>
      <Router history={history}>
        <AppRoutes />
      </Router>
    </Provider>
  );

  getByTestId('habits');
  getByTestId('habit-form');
  getByTestId('open-habit-form');
  fireEvent.click(getByTestId('open-habit-form'));
  expect(getByLabelText('New Habit')).toBeInTheDocument();

  const input = getByLabelText(/new habit/i);
  // input.value = 'new test habit';
  const submitButton = getByTestId('submit');
  fireEvent.change(input, { target: { value: 'new test habit' } });
  fireEvent.click(submitButton);

  store.dispatch(getHabits());
  const newHabit = await waitForElement(() => {
    getByText('new test habit');
  });

  expect(newHabit).toBeInTheDocument();
  debug();
});
