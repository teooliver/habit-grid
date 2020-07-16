import React, { useState, useEffect } from "react";
import { StoreState } from "../../../redux/reducers";
import { connect } from "react-redux";
import { Habit } from "../../../redux/actions/habits";
import IndividualHabitCardUL from "./IndividualHabitCardUL";

interface Props {
  habits: Habit[];
  selectedMonth: number;
  selectedYear: number;
}

const IndividualHabitCard: React.FC<Props> = ({
  habits,
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
    <>
      {habits.length !== 0 ? (
        habits.map((habit, index) => {
          return (
            <div className='HabitsCard'>
              <h3>Habit Title</h3>
              <IndividualHabitCardUL
                key={index}
                habit={habit}
                index={index}
                daysArray={daysArray}
              />
            </div>
          );
        })
      ) : (
        <div className='splash-screen'>{/* <StabilityBall /> */}</div>
      )}
    </>
  );
};

const mapStateToProps = ({ habits, selectedMonthYear }: StoreState) => {
  return {
    habits,
    selectedMonth: selectedMonthYear.selectedMonth,
    selectedYear: selectedMonthYear.selectedYear,
  };
};

export default connect(mapStateToProps)(IndividualHabitCard);
