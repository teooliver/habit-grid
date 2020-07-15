import React, { useEffect } from "react";
import HabitsTable from "./table-view/HabitsTable";
import MonthYearDropdown from "./monthYearSelector/MonthYearDropdown";
import { getHabits } from "../../redux/actions";
import { connect } from "react-redux";

const HabitTracker = () => {
  // THis should go to APP
  useEffect(() => {
    getHabits();
  }, []);

  return (
    <>
      <MonthYearDropdown />
      <section className='habits-table-container'>
        <HabitsTable />
      </section>
    </>
  );
};

export default connect(null, { getHabits })(HabitTracker);
