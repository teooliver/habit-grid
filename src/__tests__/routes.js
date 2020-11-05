import React from 'react';
// import { render, screen } from '../utils/test-utils';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Home } from '../pages/Home';
import { Provider } from 'react-redux';

const initialState = { alerts: [] };

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore(initialState);
// wrapper = shallow(<Login store={store}/>)

beforeAll(() => {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'portal-root');
  document.body.append(portalRoot);
});

const getHabits = jest.fn(() => {
  return {
    hello: [],
  };
});
const getBoards = jest.fn(() => {
  return {
    hello: [],
  };
});
const getViewSelection = jest.fn(() => {
  return {
    hello: [],
  };
});

test('renders with Home redux', () => {
  render(
    <BrowserRouter>
      <Home
      // store={store}
      // getHabits={getHabits}
      // getBoards={getBoards}
      // getViewSelection={getViewSelection}
      />
    </BrowserRouter>
  );

  expect(screen.getByTestId('app-test')).toBeInTheDocument();
  expect(screen.getByText('Habits'));
});

test('render 404 page when route is not found', () => {
  const history = createMemoryHistory();
  // history.push('/some/bad/route');
  const route = '/some/bad/route';
  window.history.pushState({}, 'Test page', route);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <App
          getHabits={getHabits}
          getBoards={getBoards}
          getViewSelection={getViewSelection}
        />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText('Error 404')).toBeInTheDocument();
  expect(
    screen.getByText('Hummm...Something went wrong...')
  ).toBeInTheDocument();
});

// test('render About Page', () => {
//   const route = '/about';
//   window.history.pushState({}, 'Test page', route);

//   render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   );

//   expect(screen.getByText('ABOUT')).toBeInTheDocument();
// });
