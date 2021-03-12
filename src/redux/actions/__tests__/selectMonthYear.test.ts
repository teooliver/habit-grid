import { selectMonth, selectYear } from '../selectMonthYear';
import { ActionTypes } from '../types';

describe('Redux::Actions Alerts', () => {
  it('should return action of type SelectMonthAction when selectMonth is called', () => {
    expect(selectMonth(4)).toEqual({
      type: ActionTypes.selectMonth,
      payload: 4,
    });
  });

  it('should return action of type SelectYearAction when selectYear is called', () => {
    expect(selectYear(2020)).toEqual({
      type: ActionTypes.selectYear,
      payload: 2020,
    });
  });
});
