import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../redux/reducers";
import { Habit } from "../../redux/actions";
import HabitRow from "./HabitRow";
import { ReactComponent as StabilityBall } from "../../images/undraw_Stability_ball_b4ia.svg";

interface Props {
  selectedMonth: number;
  selectedYear: number;
  habits: Habit[];
}

export const HabitsTable: React.FC<Props> = ({
  selectedMonth,
  selectedYear,
  habits,
}) => {
  const [daysArray, setDaysArray] = useState<string[]>([]);

  useEffect(() => {
    renderTableHeader(selectedMonth, selectedYear);
  }, [selectedMonth]);

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

export default connect(mapStateToProps)(HabitsTable);
