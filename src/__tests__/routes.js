import React from 'react';
import { render, screen } from './test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { App } from '../App';

test('render 404 page when route is not found', () => {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'portal-root');
  document.body.append(portalRoot);

  const history = createMemoryHistory();
  history.push('/about');

  render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(screen.getByText('Error 404')).toBeInTheDocument();
});

test('render App', () => {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'portal-root');
  document.body.append(portalRoot);

  render(<App />);

  expect(screen.getByTestId('app-test')).toBeInTheDocument();
});
