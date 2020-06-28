import React from "react";
import HabitsTable from "./HabitsTable";
import SelectMonth from "./SelectMonth";
import HabitForm from "./HabitForm";

const HabitTracker = () => {
  return (
    <div>
      <h1>HabitGrid</h1>
      <SelectMonth />
      <HabitsTable />
      <HabitForm />
    </div>
  );
};

export default HabitTracker;
