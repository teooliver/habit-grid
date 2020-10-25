import React from 'react';
import { render, screen } from './test-utils';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { App } from '../App';

beforeAll(() => {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'portal-root');
  document.body.append(portalRoot);
});

test('render App', () => {
  render(<App />);

  expect(screen.getByTestId('app-test')).toBeInTheDocument();
});

test('render 404 page when route is not found', () => {
  const history = createMemoryHistory();
  // history.push('/some/bad/route');
  const route = '/some/bad/route';
  window.history.pushState({}, 'Test page', route);

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText('Error 404')).toBeInTheDocument();
  expect(
    screen.getByText('Hummm...Something went wrong...')
  ).toBeInTheDocument();
});

test('render About Page', () => {
  const route = '/about';
  window.history.pushState({}, 'Test page', route);

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText('ABOUT')).toBeInTheDocument();
});
