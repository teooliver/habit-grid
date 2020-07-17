import React, { useState, useEffect } from "react";
import { StoreState } from "../../../redux/reducers";
import { connect } from "react-redux";
import { Habit } from "../../../redux/actions/habits";
import HabitCardUL from "./HabitCardUL";

interface Props {
  habit: Habit;
  selectedMonth: number;
  selectedYear: number;
  index: number;
}

const HabitCard: React.FC<Props> = ({
  habit,
  index,
  selectedMonth,
  selectedYear,
}) => {
  const [daysArray, setDaysArray] = useState<string[]>([]);
  // Maybe this should be a separate Component and store the info on State(Redux)
  useEffect(() => {
    renderTableHeader(selectedMonth, selectedYear);
  }, [selectedMonth]);

  // FindAmountOfDaysInMonth?
  const renderTableHeader = (month: number, year: number) => {
    let days: string[] = [];
    let daysAmountInSelectedMonth: number =
      new Date(year, month + 1, 0).getDate() + 1;
    console.log("month: ", month, "year: ", year);
    console.log("Amount", daysAmountInSelectedMonth);
    for (let i = 1; i < daysAmountInSelectedMonth; i++) {
      days.push(`${i}`);
    }

    setDaysArray([...days]);
    console.log("Days Array", daysArray);
  };

  return (
    <div className='HabitsCard'>
      <h3 className='habit-name'>{habit.name}</h3>
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

export default connect(mapStateToProps)(HabitCard);
