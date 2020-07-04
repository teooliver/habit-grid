import { ActionTypes, CalendarActions } from "../actions/index";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

export const selectMonthReducer = (
  state = { selectedMonth: currentMonth, selectedYear: currentYear },
  action: CalendarActions
) => {
  switch (action.type) {
    case ActionTypes.selectMonth:
      return {
        selectedMonth: action.payload,
        selectedYear: state.selectedYear,
      };
    case ActionTypes.selectYear:
      return {
        selectedMonth: state.selectedMonth,
        selectedYear: action.payload,
      };
    default:
      return state;
  }
};
