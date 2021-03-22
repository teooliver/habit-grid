import React, { useState, useRef, useEffect, useCallback } from 'react';
import { months } from '../../../../utils/constants';
import { StoreState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import {
  selectMonth,
  selectYear,
} from '../../../../redux/actions/selectMonthYear';
import ArrowBarRightIcon from '../../../layout/icons/ArrowBarRightIcon';
import ArrowBarLeftIcon from '../../../layout/icons/ArrowBarLeftIcon';

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMonth: number;
  selectMonth: typeof selectMonth;
  selectYear: typeof selectYear;
  possibleYearOptions: number[];
  selectedYear: number;
}

const DropDownMenu: React.FC<Props> = ({
  setIsOpen,
  selectMonth,
  selectedMonth,
  possibleYearOptions,
  selectedYear,
}) => {
  const [activeMenu, setActiveMenu] = useState('main');
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e) => {
      if (
        dropDownRef.current != null &&
        !dropDownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      } else {
        return;
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    document.addEventListener('click', (e) => handleClickOutside(e));
    return () => {
      document.removeEventListener('click', (e) => handleClickOutside(e));
    };
  }, [handleClickOutside]);

  return (
    <div ref={dropDownRef} className="dropdown" data-testid="dropdown">
      <ul className={` ${activeMenu === 'main' ? 'active' : 'inactive'}`}>
        <li
          className="menu-item"
          onClick={() => {
            setActiveMenu('month');
          }}
        >
          <span>Month</span>
          <ArrowBarRightIcon />
        </li>
        <li
          className="menu-item"
          onClick={() => {
            setActiveMenu('year');
          }}
        >
          <span>Year</span>
          <ArrowBarRightIcon />
        </li>
      </ul>

      <ul className={` ${activeMenu === 'month' ? 'active' : 'inactive'}`}>
        <li className="menu-item" onClick={() => setActiveMenu('main')}>
          <ArrowBarLeftIcon />
        </li>
        {months.map((month, index) => {
          return (
            <li
              key={index}
              className={`menu-item ${selectedMonth === index ? 'active' : ''}`}
            >
              <button
                type="button"
                onClick={() => {
                  selectMonth(index);
                }}
              >
                {month}
              </button>
            </li>
          );
        })}
      </ul>

      <ul className={` ${activeMenu === 'year' ? 'active' : 'inactive'}`}>
        <li className="menu-item" onClick={() => setActiveMenu('main')}>
          <ArrowBarLeftIcon />
        </li>
        {possibleYearOptions.map((year, index) => {
          return (
            <li
              key={index}
              className={`menu-item ${selectedYear === year ? 'active' : ''}`}
            >
              <button
                type="button"
                onClick={() => {
                  selectYear(year);
                }}
              >
                {year}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
const mapStateProps = ({ selectedMonthYear }: StoreState) => {
  return {
    selectedMonth: selectedMonthYear.selectedMonth,
    selectedYear: selectedMonthYear.selectedYear,
  };
};

export default connect(mapStateProps, { selectMonth, selectYear })(
  DropDownMenu
);
