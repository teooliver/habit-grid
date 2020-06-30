import React from "react";
import HabitsTable from "./HabitsTable";
import SelectMonth from "./SelectMonth";
import HabitForm from "./HabitForm";

const HabitTracker = () => {
  return (
    <>
      {/* <SelectMonth /> */}
      <HabitsTable />
      <HabitForm />
    </>
  );
};

export default HabitTracker;
