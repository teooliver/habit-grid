import React from 'react';
// import { render, screen } from '../utils/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppRoutes } from '../../AppRoutes';
import {
  fireEvent,
  getByLabelText,
  render,
  screen,
} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

jest.mock('../../indexedDb/connectDb.ts');

const initialState = { alerts: [], habits: [], boards: [] };
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore(initialState);

beforeAll(() => {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'portal-root');
  document.body.append(portalRoot);
});

test('can add Habits', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  // const route = '/about';
  // window.history.pushState({}, 'Home Page Test', route);
  const { getByLabelText, getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <AppRoutes />
      </Router>
    </Provider>
  );

  expect(getByTestId('habits')).toBeInTheDocument();
  // expect(getByTestId('habit-form')).toBeInTheDocument();
  // expect(getByTestId('open-habit-form')).toBeInTheDocument();
  // fireEvent.click(getByTestId('open-habit-form'), 'click');
  // expect(getByLabelText('name')).toBeInTheDocument();

  // const input = getByLabelText(/name/i);
  // fireEvent.change(input, { target: { value: 'new test habit' } });
});
