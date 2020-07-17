import React, { useState, useEffect } from "react";
import DropDownMenu from "./DropDownMenu";
import { StoreState } from "../../../../redux/reducers";
import { connect } from "react-redux";
import { months } from "../../../../utils/variables";
import ChevronBarExpandIcon from "../../../layout/icons/ChevronBarExpandIcon";
import { Habit } from "../../../../redux/actions";

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
  const [possibleYearOptions, setPossibleYearOptions] = useState<number[]>([]);

  useEffect(() => {
    checkYearInEvents();
  }, [habits]);

  const checkYearInEvents = () => {
    habits.forEach((habit) => {
      habit.events.forEach((event) => {
        if (!possibleYearOptions.includes(event.getFullYear())) {
          setPossibleYearOptions([...possibleYearOptions, event.getFullYear()]);
          // possibleYearOptions.push(event.getFullYear());
        } else {
          return;
        }
      });
    });
  };

  // checkYearInEvents();

  return (
    <>
      {habits.length !== 0 && (
        <div className='MonthDropdown'>
          <div onClick={() => setIsOpen(!isOpen)}>
            <button className='dropdown-button'>
              <span className='dropdown-button-text'>
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
const mapStateProps = ({ selectedMonthYear, habits }: StoreState) => {
  return {
    selectedMonth: selectedMonthYear.selectedMonth,
    selectedYear: selectedMonthYear.selectedYear,
    habits: habits,
  };
};

export default connect(mapStateProps)(MonthYearDropdown);
