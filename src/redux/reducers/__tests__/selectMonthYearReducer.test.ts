import { selectMonthYearReducer } from '../selectMonthYearReducer';
import { ActionTypes } from '../../actions/index';

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

describe('Test Select Month and Year Reducer', () => {
  it('should handle select Month', () => {
    expect(
      selectMonthYearReducer(
        { selectedMonth: currentMonth, selectedYear: currentYear },
        {
          type: ActionTypes.selectMonth,
          payload: 4,
        }
      )
    ).toEqual({
      selectedMonth: 4,
      selectedYear: currentYear,
    });
  });

  it('should handle select Year', () => {
    expect(
      selectMonthYearReducer(
        { selectedMonth: currentMonth, selectedYear: currentYear },
        {
          type: ActionTypes.selectYear,
          payload: 2020,
        }
      )
    ).toEqual({
      selectedMonth: currentMonth,
      selectedYear: 2020,
    });
  });
});
