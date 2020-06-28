import React from "react";
import { connect } from "react-redux";
import { removePoint, Habit } from "../../redux/actions/habits";
import HabitCell from "./HabitCell";
import { colors } from "../../utils/variables";

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
      <td
        className="habit-name"
        style={{ color: colors[((index % n) + n) % n] }}
      >
        {habit.name}
      </td>
      {daysArray.map((day, i) => {
        return (
          <HabitCell
            key={i}
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
