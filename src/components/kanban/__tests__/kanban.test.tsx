import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AppRoutes } from '../../../AppRoutes';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

jest.mock('../../../indexedDb/connectDb.ts');

const initialState = { alerts: [], habits: [], boards: [] };
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore(initialState);

describe('Test Router', () => {
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
});
