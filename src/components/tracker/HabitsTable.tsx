import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../redux/reducers";
import { Habit } from "../../redux/actions";
import { getHabits } from "../../redux/actions";
import HabitRow from "./HabitRow";
import { months } from "../../utils/variables";
import MonthYearDropdown from "./monthYearSelector/MonthYearDropdown";
import { ReactComponent as StabilityBall } from "../../images/undraw_Stability_ball_b4ia.svg";

interface Props {
  getHabits: Function;
  selectedMonth: number;
  habits: Habit[];
}

export const HabitsTable: React.FC<Props> = ({
  getHabits,
  selectedMonth,
  habits,
}) => {
  useEffect(() => {
    getHabits();
  }, []);

  useEffect(() => {
    renderTableHeader(daysOnSelectedMonth);
  }, []);

  const daysOnSelectedMonth: number =
    new Date(2019, selectedMonth + 1, 0).getDate() + 1;

  let daysArray: string[] = [];
  const renderTableHeader = (days: number) => {
    for (let i = 1; i < days; i++) {
      daysArray.push(`${i}`);
    }
  };

  renderTableHeader(daysOnSelectedMonth);

  return (
    <>
      {habits.length != 0 ? (
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
        <div className="">
          <StabilityBall />
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({
  habits,
  selectedMonth,
}: StoreState): { habits: Habit[]; selectedMonth: number } => {
  return {
    habits,
    selectedMonth,
  };
};

export default connect(mapStateToProps, { getHabits })(HabitsTable);
