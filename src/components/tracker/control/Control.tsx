import React from "react";
import MonthYearDropdown from "./monthYearSelector/MonthYearDropdown";
import ViewSelection from "./ViewSelection";

const Control = () => {
  return (
    <div className='control'>
      <MonthYearDropdown />
      <ViewSelection />
    </div>
  );
};

export default Control;
