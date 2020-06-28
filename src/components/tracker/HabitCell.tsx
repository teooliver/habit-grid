import React, { FC } from "react";
import { Habit } from "../../redux/actions";
import { StoreState } from "../../redux/reducers";
import { connect } from "react-redux";
import { addPoint, removePoint } from "../../redux/actions/habits";

interface Props {
  day: string;
  habit: Habit;
  color: string;
  selectedMonth: number;
  removePoint: Function;
  addPoint: Function;
}

const HabitCell: FC<Props> = ({
  day,
  habit,
  color,
  selectedMonth,
  removePoint,
  addPoint,
}) => {
  const { events, id } = habit;
  // const [isDateInEvents, setIsDateInEvents] = useState(false);

  const thisCellDate = new Date(2020, selectedMonth, parseInt(day));

  // useEffect(() => {
  //   checkDateInEvent();
  // }, [habit, selectedMonth]);

  const foundDate = events.find((event) => {
    if (
      event.getDate() === thisCellDate.getDate() &&
      event.getMonth() === thisCellDate.getMonth()
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

const mapStateToProps = ({
  selectedMonth,
}: StoreState): { selectedMonth: number } => {
  return {
    selectedMonth,
  };
};

export default connect(mapStateToProps, { addPoint, removePoint })(HabitCell);
