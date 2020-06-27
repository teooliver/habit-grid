import React from "react";
import HabitsTable from "./HabitsTable";
import SelectMonth from "./SelectMonth";

const HabitTracker = () => {
  return (
    <div>
      <SelectMonth />
      <HabitsTable />
    </div>
  );
};

export default HabitTracker;
