import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { createHabit } from "../../redux/actions/habits";
import PlusCircleIcon from "../layout/PlusCircleIcon";

interface Props {
  createHabit: Function;
}
const HabitForm: FC<Props> = ({ createHabit }) => {
  const [open, setOpen] = useState(false);
  const [habitName, setHabitName] = useState("");

  return (
    <div className="HabitForm">
      <div onClick={() => setOpen(!open)}>
        <PlusCircleIcon className="plus-circle" />
      </div>
      {open && (
        <form>
          <label htmlFor="name">Habit</label>
          <input
            type="text"
            id="name"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              createHabit(habitName);
            }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default connect(null, { createHabit })(HabitForm);
