import React, { useState, useRef, useEffect } from "react";
import DropDownMenu from "./DropDownMenu";
import { StoreState } from "../../../redux/reducers";
import { connect } from "react-redux";
import { months } from "../../../utils/variables";
import ChevronBarExpandIcon from "../../layout/icons/ChevronBarExpandIcon";
import { Habit } from "../../../redux/actions";
import { selectYear } from "../../../redux/actions/selectMonth";

interface Props {
  selectedMonth: number;
  selectedYear: number;
  habits: Habit[];
}

const MonthYearDropdown: React.FC<Props> = ({
  selectedMonth,
  selectedYear,
  habits,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  let possibleYearOptions: number[] = [];
  const checkYearInEvents = () => {
    habits.forEach((habit) => {
      habit.events.forEach((event) => {
        if (!possibleYearOptions.includes(event.getFullYear())) {
          possibleYearOptions.push(event.getFullYear());
        } else {
          return;
        }
      });
    });
  };

  useEffect(() => {
    checkYearInEvents();
  }, [possibleYearOptions]);

  return (
    <>
      {habits.length !== 0 && (
        <div className="MonthDropdown">
          <div onClick={() => setIsOpen(!isOpen)}>
            <button className="dropdown-button">
              <span className="dropdown-button-text">
                {months[selectedMonth].toUpperCase()} / {selectedYear}
              </span>
              <ChevronBarExpandIcon
                className={`dropdown-button-icon ${isOpen ? "isOpen" : ""}`}
              />
            </button>
          </div>
          {isOpen && (
            <DropDownMenu
              setIsOpen={setIsOpen}
              possibleYearOptions={possibleYearOptions}
            />
          )}
        </div>
      )}
    </>
  );
};
const mapStateProps = ({ selectedMonth, habits }: StoreState) => {
  return {
    selectedMonth: selectedMonth.selectedMonth,
    selectedYear: selectedMonth.selectedYear,
    habits: habits,
  };
};

export default connect(mapStateProps)(MonthYearDropdown);
