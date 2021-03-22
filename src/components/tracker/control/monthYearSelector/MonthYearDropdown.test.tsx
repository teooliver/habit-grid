import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { fireEvent, render } from '@testing-library/react';
import { reducers, StoreState } from '../../../../redux/reducers';
import MonthYearDropdown from './MonthYearDropdown';
// import { months } from '../../../../utils/constants';

jest.mock('../../../../indexedDb/connectDb.ts');

// const currentMonthNumber = new Date().getMonth;

const fake2000Date = new Date('January 1, 2000, 00:00:00');
const fakeCurrentDate = new Date();

const initialState: Partial<StoreState> = {
  habits: [{ name: 'hello', events: [fake2000Date, fakeCurrentDate] }],
};
const store = createStore(reducers, initialState, applyMiddleware(thunk));

beforeAll(() => {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'portal-root');
  document.body.append(portalRoot);
});

describe.only('Test MonthYearDropdown Component', () => {
  test('should open dropdown', async () => {
    const { getByTestId, queryByTestId, getByRole } = render(
      <Provider store={store}>
        <MonthYearDropdown />
      </Provider>
    );

    const dropDownButton = getByRole('button');
    const dropDown = queryByTestId('dropdown');

    expect(dropDown).not.toBeInTheDocument();

    fireEvent.click(dropDownButton);

    //TODO: This is not right, need to find a better way of testing
    const dropDown2 = getByTestId('dropdown');
    expect(dropDown2).toBeInTheDocument();
  });

  test('can select  Month', async () => {
    const { queryByTestId, getByRole, getByText } = render(
      <Provider store={store}>
        <MonthYearDropdown />
      </Provider>
    );

    const dropDownButton = getByRole('button');

    fireEvent.click(dropDownButton);
    const dropDown = queryByTestId('dropdown');
    expect(dropDown).toBeInTheDocument();

    const monthTab = getByText(/Month/i);

    fireEvent.click(monthTab);

    const monthOption = getByText(/Jan/i);
    fireEvent.click(monthOption);

    // TODO: find better regex for "Jan / 2021"
    const selectedMonthYear = getByText('JAN / 2021');

    // TODO: Jest is complaining the toBe('JAN / 2021')
    expect(selectedMonthYear).toBeInTheDocument();
  });

  test('can select  Year', async () => {
    const { queryByTestId, getByRole, getByText } = render(
      <Provider store={store}>
        <MonthYearDropdown />
      </Provider>
    );

    const dropDownButton = getByRole('button');

    fireEvent.click(dropDownButton);
    const dropDown = queryByTestId('dropdown');
    expect(dropDown).toBeInTheDocument();

    const yearTab = getByText('Year');
    fireEvent.click(yearTab);

    // debug();

    const yearOption = getByText('2000');
    fireEvent.click(yearOption);

    // // // Todo find better regex for "Jan / 2021"
    const selectedMonthYear = getByText('JAN / 2021');

    // TODO: Jest is complaining the toBe('JAN / 2021')
    expect(selectedMonthYear).toBeInTheDocument();
  });
});
