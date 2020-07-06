import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../redux/reducers";
import { Habit } from "../../redux/actions";
import { getHabits } from "../../redux/actions";
import HabitRow from "./HabitRow";
import { ReactComponent as StabilityBall } from "../../images/undraw_Stability_ball_b4ia.svg";

interface Props {
  getHabits: Function;
  selectedMonth: number;
  selectedYear: number;
  habits: Habit[];
}

export const HabitsTable: React.FC<Props> = ({
  getHabits,
  selectedMonth,
  selectedYear,
  habits,
}) => {
  const [daysArray, setDaysArray] = useState<string[]>([]);

  useEffect(() => {
    getHabits();
  }, []);

  useEffect(() => {
    renderTableHeader();
  }, []);

  const renderTableHeader = () => {
    let days: string[] = [];
    let daysAmountInSelectedMonth: number =
      new Date(selectedYear, selectedMonth + 1, 0).getDate() + 1;

    for (let i = 1; i < daysAmountInSelectedMonth; i++) {
      days.push(`${i}`);
    }

    setDaysArray(days);
  };

  return (
    <>
      {habits.length !== 0 ? (
        <table className="HabitsTable">
          <thead>
            <tr>
              <th className="th-dropdown">{/* <MonthYearDropdown /> */}</th>
              {daysArray.map((day) => {
                return <th key={day}>{day}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, index) => {
              return (
                <HabitRow
                  key={index}
                  habit={habit}
                  index={index}
                  daysArray={daysArray}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="splash-screen">
          <StabilityBall />
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ habits, selectedMonth }: StoreState) => {
  return {
    habits,
    selectedMonth: selectedMonth.selectedMonth,
    selectedYear: selectedMonth.selectedYear,
  };
};

export default connect(mapStateToProps, { getHabits })(HabitsTable);
