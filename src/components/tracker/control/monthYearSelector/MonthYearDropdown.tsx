import React, { useState, useEffect } from 'react';
import { StoreState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import { months } from '../../../../utils/constants';
import { Habit } from '../../../../redux/actions';
import DropDownMenu from './DropDownMenu';
import ChevronBarExpandIcon from '../../../layout/icons/ChevronBarExpandIcon';

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
    // Could this becaume a Redux Selector?
    const checkYearInEvents = () => {
      habits.forEach((habit) => {
        habit.events.forEach((event) => {
          if (!possibleYearOptions.includes(event.getFullYear())) {
            setPossibleYearOptions([
              ...possibleYearOptions,
              event.getFullYear(),
            ]);
            // possibleYearOptions.push(event.getFullYear());
          } else {
            return;
          }
        });
      });
    };
    checkYearInEvents();
  }, [habits, possibleYearOptions]);

  return (
    <>
      {habits.length !== 0 && (
        <div className="MonthDropdown">
          <button
            aria-expanded={isOpen ? 'true' : 'false'}
            className="dropdown-button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="dropdown-button-text">
              {months[selectedMonth].toUpperCase()} / {selectedYear}
            </span>
            <ChevronBarExpandIcon
              className={`dropdown-button-icon ${isOpen ? 'isOpen' : ''}`}
            />
          </button>

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
