import { ActionTypes } from './types';

export interface SelectMonthAction {
  type: ActionTypes.selectMonth;
  payload: number;
}

export interface SelectYearAction {
  type: ActionTypes.selectYear;
  payload: number;
}

export const selectMonth = (month: number): SelectMonthAction => {
  return {
    type: ActionTypes.selectMonth,
    payload: month,
  };
};

export const selectYear = (year: number): SelectYearAction => {
  return {
    type: ActionTypes.selectYear,
    payload: year,
  };
};

// get years (get years where the is habits on and return array of years)
