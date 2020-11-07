import React from 'react';
// import { render, screen } from '../utils/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppRoutes } from '../AppRoutes';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

jest.mock('../indexedDb/connectDb.ts');

const initialState = { alerts: [], habits: [], boards: [] };
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore(initialState);

beforeAll(() => {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'portal-root');
  document.body.append(portalRoot);
});

test('renders Home when navigating to "/"', () => {
  const history = createMemoryHistory({ initialEntries: ['/home'] });
  // const route = '/about';
  // window.history.pushState({}, 'Home Page Test', route);
  render(
    <Provider store={store}>
      <Router history={history}>
        <AppRoutes />
      </Router>
    </Provider>
  );

  expect(screen.getByTestId('home-test')).toBeInTheDocument();
});

test('renders Boards when navigating to "/boards"', () => {
  const history = createMemoryHistory({ initialEntries: ['/boards'] });

  render(
    <Provider store={store}>
      <Router history={history}>
        <AppRoutes />
      </Router>
    </Provider>
  );

  expect(screen.getByTestId('boards-test')).toBeInTheDocument();
});

test('renders HabitTracker page when navigating to "/"', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  render(
    <Provider store={store}>
      <Router history={history}>
        <AppRoutes />
      </Router>
    </Provider>
  );

  expect(screen.getByTestId('habits')).toBeInTheDocument();
});

test('renders 404 page when navigating to a bad route "/bad/route"', () => {
  const history = createMemoryHistory({ initialEntries: ['/bad/route'] });

  render(
    <Provider store={store}>
      <Router history={history}>
        <AppRoutes />
      </Router>
    </Provider>
  );

  expect(screen.getByTestId('404')).toBeInTheDocument();
});
