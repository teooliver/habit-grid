import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppRoutes } from '../../AppRoutes';
import { createStore, applyMiddleware } from 'redux';
import { reducers } from '../../redux/reducers';
import { fireEvent, render, waitFor } from '@testing-library/react';

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

test('can add new Habits', async () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  const { getByLabelText, getByTestId, getByText, debug } = render(
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
  fireEvent.change(input, { target: { value: 'test habit' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    getByText('test habit');
  });
});
