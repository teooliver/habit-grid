import React, { useState } from "react";
import { connect } from "react-redux";
import { removeHabit, Habit } from "../../redux/actions/habits";
import HabitCell from "./HabitCell";
import { colors } from "../../utils/variables";
import TrashIcon from "../layout/icons/TrashIcon";

const n = colors.length;

interface Props {
  habit: Habit;
  removeHabit: Function;
  index: number;
  daysArray: string[];
}

const HabitRow: React.FC<Props> = ({
  habit,
  removeHabit,
  index,
  daysArray,
}) => {
  const [isTrashVisible, setisTrashVisible] = useState(false);

  return (
    <tr>
      <td
        className="habit-name"
        style={{ color: colors[((index % n) + n) % n] }}
        onClick={() => setisTrashVisible(!isTrashVisible)}
      >
        <div className="habit-name-items">
          <span> {habit.name} </span>

          <div className="trash-icon" onClick={() => removeHabit(habit.id)}>
            {isTrashVisible && <TrashIcon />}
          </div>
        </div>
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

export default connect(null, { removeHabit })(HabitRow);
