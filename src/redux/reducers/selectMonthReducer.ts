import { ActionTypes, CalendarActions } from "../actions/index";

const currentMonth = new Date().getMonth();

export const selectMonthReducer = (
  state: number = currentMonth,
  action: CalendarActions
) => {
  switch (action.type) {
    case ActionTypes.selectMonth:
      return action.payload;
    default:
      return state;
  }
};
