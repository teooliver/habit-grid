import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../redux/reducers";
import { Habit } from "../../redux/actions";
import { getHabits } from "../../redux/actions";
import HabitRow from "./HabitRow";

interface HabitsTableProps {
  getHabits: Function;
  selectedMonth: number;
  habits: Habit[];
}

export const HabitsTable: React.FC<HabitsTableProps> = ({
  getHabits,
  selectedMonth,
  habits,
}) => {
  useEffect(() => {
    getHabits();
  }, []);

  const daysOnSelectedMonth: number =
    new Date(2019, selectedMonth + 1, 0).getDate() + 1;

  let daysArray: string[] = [];
  const renderTableHeader = (days: number) => {
    for (let i = 1; i < days; i++) {
      daysArray.push(`${i}`);
    }
  };

  // const checkHabits = habits.length !== 0;

  return (
    <>
      {habits ? (
        <table className="HabitsTable">
          <thead>
            <th></th>
            {renderTableHeader(daysOnSelectedMonth)}
            {daysArray.map((day) => {
              return <th key={day}>{day}</th>;
            })}
          </thead>
          <tbody>
            {habits.map((habit, index) => {
              return (
                <HabitRow habit={habit} index={index} daysArray={daysArray} />
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="">Nothing to show yet</div>
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
