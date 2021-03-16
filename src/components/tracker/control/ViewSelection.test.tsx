import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { fireEvent, render, waitFor } from '@testing-library/react';
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
    const { getByTestId, container } = render(
      <Provider store={store}>
        <ViewSelection />
      </Provider>
    );

    const tableIconSpan = getByTestId('table-view-icon');
    const tableIcon = container.querySelector(
      '[data-testId=table-view-icon] > svg'
    );
    const individualIconSpan = getByTestId('individual-view-icon');
    const individualIcon = container.querySelector(
      '[data-testId=individual-view-icon] > svg'
    );

    expect(tableIcon).toHaveClass('selected');

    fireEvent.click(individualIconSpan);

    await waitFor(() => {
      expect(individualIcon).toHaveClass('selected');
    });

    fireEvent.click(tableIconSpan);
    await waitFor(() => expect(tableIcon).toHaveClass('selected'));
  });

  // TODO: check selectView has been called with the proper arguments
  test('should dispatch action of type  XXXX on view selection', async () => {
    store.dispatch = jest.fn();

    const { getByTestId } = render(
      <Provider store={store}>
        <ViewSelection />
      </Provider>
    );

    const individualIconSpan = getByTestId('individual-view-icon');

    fireEvent.click(individualIconSpan);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
