import React, { useState, useEffect } from 'react';
import { StoreState } from '../../../redux/reducers';
import { connect } from 'react-redux';
import { Habit, removeHabit } from '../../../redux/actions/habits';
import HabitCardUL from './HabitCardUL';
import TrashIcon from '../../layout/icons/TrashIcon';

interface Props {
  habit: Habit;
  selectedMonth: number;
  selectedYear: number;
  removeHabit: Function;
  index: number;
}

const HabitCard: React.FC<Props> = ({
  habit,
  index,
  selectedMonth,
  selectedYear,
  removeHabit,
}) => {
  const [isTrashVisible, setisTrashVisible] = useState(false);
  const [daysArray, setDaysArray] = useState<string[]>([]);
  useEffect(() => {
    getTableHeaderData(selectedMonth, selectedYear);
  }, [selectedMonth]);

  // FindAmountOfDaysInMonth
  const getTableHeaderData = (month: number, year: number) => {
    let days: string[] = [];
    let amountOfDayInSelectedMonth: number =
      new Date(year, month + 1, 0).getDate() + 1;

    for (let i = 1; i < amountOfDayInSelectedMonth; i++) {
      days.push(`${i}`);
    }

    setDaysArray([...days]);
  };

  return (
    <div className="HabitsCard">
      <h3
        className="habit-name"
        onClick={() => setisTrashVisible(!isTrashVisible)}
      >
        <div className="habit-name-items">
          <span> {habit.name} </span>

          <div
            className={`trash-icon ${isTrashVisible ? '' : 'display-none'}`}
            onClick={() => removeHabit(habit.id)}
          >
            {isTrashVisible && <TrashIcon />}
          </div>
        </div>
      </h3>
      <HabitCardUL
        key={index}
        habit={habit}
        index={index}
        daysArray={daysArray}
      />
    </div>
  );
};

const mapStateToProps = ({ habits, selectedMonthYear }: StoreState) => {
  return {
    habits,
    selectedMonth: selectedMonthYear.selectedMonth,
    selectedYear: selectedMonthYear.selectedYear,
  };
};

export default connect(mapStateToProps, { removeHabit })(HabitCard);
