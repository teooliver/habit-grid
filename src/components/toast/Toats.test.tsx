import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import Toast from './Toast';

const stateWithoutAlerts = {
  alerts: [],
};
const stateWithAlerts = {
  alerts: [{ msg: 'test alert', alertType: 'success', id: '1' }],
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Test Toast Component', () => {
  test('Given no alerts Toast should be hidden', () => {
    let store = mockStore(stateWithoutAlerts);

    const Wrapper = () => {
      return (
        <Provider store={store}>
          <Toast />
        </Provider>
      );
    };

    const { queryByTestId } = render(<Wrapper />);

    expect(queryByTestId('toast')).not.toBeInTheDocument();
  });

  test('Given an alerts array Toast should be visible', () => {
    let store = mockStore(stateWithAlerts);

    const Wrapper = () => {
      return (
        <Provider store={store}>
          <Toast />
        </Provider>
      );
    };

    const { getByTestId } = render(<Wrapper />);

    expect(getByTestId('toast'));
  });
});
