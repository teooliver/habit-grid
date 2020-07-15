import React, { useEffect } from "react";
import HabitsTable from "./table-view/HabitsTable";
import MonthYearDropdown from "./monthYearSelector/MonthYearDropdown";
import { getHabits } from "../../redux/actions";
import { connect } from "react-redux";
import TableIcon from "../layout/icons/TableIcon";
import Calendar3Icon from "../layout/icons/Calendar3Icon";

const HabitTracker = () => {
  // THis should go to APP
  useEffect(() => {
    getHabits();
  }, []);

  return (
    <>
      <div className='control'>
        <MonthYearDropdown />
        <div className='view-buttons'>
          <TableIcon />
          <Calendar3Icon />
        </div>
      </div>
      <section className='habits-table-container'>
        <HabitsTable />
      </section>
    </>
  );
};

export default connect(null, { getHabits })(HabitTracker);
