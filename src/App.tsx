import React, { useEffect, useState, FunctionComponent } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Habit, getHabits, removeHabit, createHabit } from "./redux/actions";
import { StoreState } from "./redux/reducers";

interface AppProps {
  habits: Habit[];
  getHabits: Function;
  removeHabit: typeof removeHabit;
  createHabit: Function;
}

const _App: React.FC<AppProps> = ({
  habits,
  getHabits,
  removeHabit,
  createHabit,
}) => {
  // const [isFetching, setIsFetching] = useState(false);
  const [habitInput, setHabitInput] = useState("");

  useEffect(() => {
    getHabits();
  }, []);

  const renderTable = (): JSX.Element[] | JSX.Element => {
    return habits!.map((habit: Habit) => {
      return (
        <div>
          <p>{habit.name}</p>
          {/* <p>{ habit.events[0].getDay()}</p> */}
        </div>
      );
    });
  };

  return (
    <div className="App">
      <h1>Hello There</h1>
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

const mapStateToProps = ({ habits }: StoreState): { habits: Habit[] } => {
  return { habits };
};

export const App = connect(mapStateToProps, {
  getHabits,
  removeHabit,
  createHabit,
})(_App);
