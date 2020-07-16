import React, { useState } from "react";
import { connect } from "react-redux";
import { removeHabit, Habit } from "../../../redux/actions/habits";
import { colors } from "../../../utils/variables";
import TrashIcon from "../../layout/icons/TrashIcon";
import IndividualHabitCardLi from "./IndividualHabitCardLi";

const n = colors.length;

interface Props {
  habit: Habit;
  removeHabit: Function;
  index: number;
  daysArray: string[];
}

const IndividualHabitCardU: React.FC<Props> = ({
  habit,
  removeHabit,
  index,
  daysArray,
}) => {
  const [isTrashVisible, setisTrashVisible] = useState(false);

  return (
    <ul>
      {daysArray.map((day, i) => {
        return (
          <IndividualHabitCardLi
            key={i}
            day={day}
            habit={habit}
            color={colors[((index % n) + n) % n]}
          />
        );
      })}
    </ul>
  );
};

export default connect(null, { removeHabit })(IndividualHabitCardU);
