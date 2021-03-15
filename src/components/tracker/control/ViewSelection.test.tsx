import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { selectView } from '../../../redux/actions/viewActions';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { reducers } from '../../../redux/reducers';
import ViewSelection from './ViewSelection';

jest.mock('../../../indexedDb/connectDb.ts');

const initialState = {};
const store = createStore(reducers, initialState, applyMiddleware(thunk));

beforeAll(() => {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'portal-root');
  document.body.append(portalRoot);
});

describe('Test ViewSelection Component', () => {
  test('should allow selection: "individual" or "table"', async () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    const { getByTestId, debug } = render(
      <Provider store={store}>
        <Router history={history}>
          <ViewSelection />
        </Router>
      </Provider>
    );

    debug();

    expect(getByTestId('table-view-icon'));
    expect(getByTestId('individual-view-icon'));

    // fireEvent.click(getByTestId('open-habit-form'));

    // expect(getByLabelText('New Habit')).toBeInTheDocument();
    // const input = getByLabelText(/new habit/i);
    // const submitButton = getByTestId('submit');
    // fireEvent.change(input, { target: { value: 'test habit' } });
    // fireEvent.click(submitButton);

    // await waitFor(() => {
    //   getByText('test habit');
    // });
  });
});
