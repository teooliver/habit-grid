import React, { useState, useRef, useEffect } from "react";
import DropDownMenu from "./DropDownMenu";
import { StoreState } from "../../../redux/reducers";
import { connect } from "react-redux";
import { months } from "../../../utils/variables";
import ChevronBarExpandIcon from "../../layout/icons/ChevronBarExpandIcon";
import { Habit } from "../../../redux/actions";

interface Props {
  selectedMonth: number;
  habits: Habit[];
}

const MonthYearDropdown: React.FC<Props> = ({ selectedMonth, habits }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {habits.length !== 0 && (
        <div className="MonthDropdown">
          <div
            onClick={() => setIsOpen(!isOpen)}
            onBlur={() => setIsOpen(false)}
          >
            <button className="dropdown-button">
              <span className="dropdown-button-text">
                {months[selectedMonth].toUpperCase()} / 2019
              </span>
              <ChevronBarExpandIcon
                className={`dropdown-button-icon ${isOpen ? "isOpen" : ""}`}
              />
            </button>
          </div>
          {isOpen && <DropDownMenu setIsOpen={setIsOpen} />}
        </div>
      )}
    </>
  );
};
const mapStateProps = ({ selectedMonth, habits }: StoreState) => {
  return {
    selectedMonth: selectedMonth.selectedMonth,
    habits: habits,
  };
};

export default connect(mapStateProps)(MonthYearDropdown);
