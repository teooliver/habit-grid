import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../../redux/reducers";
import { Habit } from "../../../redux/actions";
import HabitRow from "./HabitRow";

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
      <table className='HabitsTable'>
        <thead>
          <tr>
            <th className='th-dropdown'>{/* <MonthYearDropdown /> */}</th>
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

export default connect(mapStateToProps)(HabitsTable);
