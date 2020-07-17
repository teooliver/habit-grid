import React from "react";
import MonthYearDropdown from "./monthYearSelector/MonthYearDropdown";
import ViewSelection from "./ViewSelection";
import { StoreState } from "../../../redux/reducers";
import { connect } from "react-redux";
import { Habit } from "../../../redux/actions";

interface Props {
  habits: Habit[];
}

const Control: React.FC<Props> = ({ habits }) => {
  return (
    <>
      {habits.length !== 0 && (
        <div className='control'>
          <MonthYearDropdown />
          <ViewSelection />
        </div>
      )}
    </>
  );
};

const mapStateProps = ({ habits }: StoreState) => {
  return {
    habits: habits,
  };
};

export default connect(mapStateProps)(Control);
