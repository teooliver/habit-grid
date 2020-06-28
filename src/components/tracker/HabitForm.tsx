import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { createHabit } from "../../redux/actions/habits";

interface Props {
  createHabit: Function;
}
const HabitForm: FC<Props> = ({ createHabit }) => {
  const [habitName, setHabitName] = useState("");
  const [habitDescription, setHabitDescription] = useState("");

  return (
    <form action="">
      <label htmlFor="name">Habit</label>
      <input
        type="text"
        id="name"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />
      <label htmlFor="description">Description</label>
      <input type="text" id="description" />
      <button
        onClick={(e) => {
          e.preventDefault();
          createHabit(habitName);
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default connect(null, { createHabit })(HabitForm);
