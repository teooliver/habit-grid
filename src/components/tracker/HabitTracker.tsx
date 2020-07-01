import React from "react";
import HabitsTable from "./HabitsTable";
import HabitForm from "./HabitForm";
import MonthYearDropdown from "./monthYearSelector/MonthYearDropdown";

const HabitTracker = () => {
  return (
    <>
      {/* <SelectMonth /> */}
      <MonthYearDropdown />
      <div className="habits-table-container">
        <HabitsTable />
      </div>
    </>
  );
};

export default HabitTracker;
