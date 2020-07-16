import React, { FC } from "react";
import { Habit } from "../../../redux/actions";
import { StoreState } from "../../../redux/reducers";
import { connect } from "react-redux";
import { addPoint, removePoint } from "../../../redux/actions/habits";

interface Props {
  day: string;
  habit: Habit;
  color: string;
  selectedMonth: number;
  selectedYear: number;
  removePoint: Function;
  addPoint: Function;
}

const HabitCardLi: FC<Props> = ({
  day,
  habit,
  color,
  selectedMonth,
  selectedYear,
  removePoint,
  addPoint,
}) => {
  const { events, id } = habit;

  const thisCellDate = new Date(selectedYear, selectedMonth, parseInt(day));

  // Should This go to /utils?
  const foundDate = events.find((event) => {
    if (
      // Review -> do I need to check all of this options? Or just getDate is enought?
      event.getDate() === thisCellDate.getDate() &&
      event.getMonth() === thisCellDate.getMonth() &&
      event.getFullYear() === thisCellDate.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <>
      {foundDate ? (
        <li
          className='selected'
          style={{ backgroundColor: color }}
          onClick={() => {
            removePoint(id!, foundDate);
          }}
        >
          {day}
        </li>
      ) : (
        <li
          onClick={() => {
            addPoint(id!, thisCellDate);
          }}
        >
          {day}
        </li>
      )}
    </>
  );
};

const mapStateToProps = ({ selectedMonthYear }: StoreState) => {
  return {
    selectedMonth: selectedMonthYear.selectedMonth,
    selectedYear: selectedMonthYear.selectedYear,
  };
};

export default connect(mapStateToProps, { addPoint, removePoint })(HabitCardLi);
