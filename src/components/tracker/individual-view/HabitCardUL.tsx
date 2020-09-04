import React from 'react';
import { connect } from 'react-redux';
import { removeHabit, Habit } from '../../../redux/actions/habits';
import { colors } from '../../../utils/constants';
import HabitCardLi from './HabitCardLi';

const n = colors.length;

interface Props {
  habit: Habit;
  removeHabit: Function;
  index: number;
  daysArray: string[];
}

const IndividualHabitCardU: React.FC<Props> = ({ habit, index, daysArray }) => {
  return (
    <ul>
      {daysArray.map((day, i) => {
        return (
          <HabitCardLi
            key={i}
            day={day}
            habit={habit}
            color={colors[((index % n) + n) % n]}
          />
        );
      })}
    </ul>
  );
};

export default connect(null, { removeHabit })(IndividualHabitCardU);
