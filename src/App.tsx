import React, { useEffect, useState } from "react";
import "./styles/styles.scss";
import { connect } from "react-redux";
import {
  Habit,
  getHabits,
  removeHabit,
  createHabit,
  addPoint,
  removePoint,
} from "./redux/actions";
import { StoreState } from "./redux/reducers";
import HabitTracker from "./components/tracker/HabitTracker";

interface AppProps {
  habits: Habit[];
  getHabits: Function;
  removeHabit: Function;
  createHabit: Function;
  addPoint: Function;
  removePoint: Function;
}

const _App: React.FC<AppProps> = ({
  habits,
  getHabits,
  removeHabit,
  createHabit,
  addPoint,
  removePoint,
}) => {
  const [habitInput, setHabitInput] = useState("");

  useEffect(() => {
    getHabits();
  }, []);

  const renderTable = (): JSX.Element[] | JSX.Element => {
    return habits!.map((habit: Habit) => {
      return (
        <div>
          <p onClick={() => addPoint(habit.id, new Date())}>{habit.name}</p>
          <p onClick={() => removeHabit(habit.id)}>Delete this evenet</p>
          {habit.events.map((event) => {
            return (
              <ul
                onClick={() => removePoint(habit.id, event)}
              >{`${event.getDay()}, ${event.getMonth()}, ${event.getFullYear()}`}</ul>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="App">
      <h1>HabitGrid</h1>

      <HabitTracker />
      <input
        type="text"
        name="habitInput"
        value={habitInput}
        onChange={(e) => {
          setHabitInput(e.target.value);
        }}
      />
      <button onClick={() => createHabit(habitInput)}>Submit</button>

      {renderTable()}
    </div>
  );
};

const mapStateToProps = ({
  habits,
  selectedMonth,
}: StoreState): { habits: Habit[]; selectedMonth: number } => {
  return { habits, selectedMonth };
};

export const App = connect(mapStateToProps, {
  getHabits,
  removeHabit,
  createHabit,
  addPoint,
  removePoint,
})(_App);
