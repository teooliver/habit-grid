import React, { FC } from "react";
import { Habit } from "../../redux/actions";
import { StoreState } from "../../redux/reducers";
import { connect } from "react-redux";
import { addPoint, removePoint } from "../../redux/actions/habits";
import { selectMonth } from "../../redux/actions/selectMonth";

interface Props {
  day: string;
  habit: Habit;
  color: string;
  selectedMonth: number;
  selectedYear: number;
  removePoint: Function;
  addPoint: Function;
}

const HabitCell: FC<Props> = ({
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
        <td
          onClick={() => {
            removePoint(id!, foundDate);
          }}
        >
          <i className="point" style={{ backgroundColor: color }}></i>
        </td>
      ) : (
        <td
          onClick={() => {
            addPoint(id!, thisCellDate);
          }}
        ></td>
      )}
    </>
  );
};

const mapStateToProps = ({ selectedMonth }: StoreState) => {
  return {
    selectedMonth: selectedMonth.selectedMonth,
    selectedYear: selectedMonth.selectedYear,
  };
};

export default connect(mapStateToProps, { addPoint, removePoint })(HabitCell);
