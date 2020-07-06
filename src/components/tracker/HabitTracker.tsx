import React from "react";
import HabitsTable from "./HabitsTable";
import MonthYearDropdown from "./monthYearSelector/MonthYearDropdown";

const HabitTracker = () => {
  return (
    <>
      <MonthYearDropdown />
      <section className="habits-table-container">
        <HabitsTable />
      </section>
    </>
  );
};

export default HabitTracker;
