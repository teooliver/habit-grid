import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';

test('render 404 page when route is not found', () => {
  const history = createMemoryHistory();
  history.push('/some/bad/route');

  render(
    <Router history={history}>
      <PageNotFound />
    </Router>
  );

  expect(screen.getByText(/Error 404/i)).toBeInTheDocument();
});
