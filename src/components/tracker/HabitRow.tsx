import React from "react";
import { connect } from "react-redux";
import { removePoint, Habit } from "../../redux/actions/habits";
import HabitPoint from "./HabitPoint";

const colors = [
  "#4c4e58",
  "#abc3e7",
  "#e7cfab",
  "#abe7cf",
  "#f4c6bc",
  "#ffb3ba",
  "#ffdfba",
  "#baffc9",
  "#bae1ff",
];
const n = colors.length;

interface Props {
  habit: Habit;
  removePoint: Function;
  index: number;
  daysArray: string[];
}

const HabitRow: React.FC<Props> = ({
  habit,
  removePoint,
  index,
  daysArray,
}) => {
  return (
    <tr>
      <td className="habit">{habit.name}</td>
      {daysArray.map((day) => {
        return (
          <HabitPoint
            day={day}
            habit={habit}
            color={colors[((index % n) + n) % n]}
          />
        );
      })}
    </tr>
  );
};

export default connect(null, { removePoint })(HabitRow);
