import React, { useEffect, useState } from "react";
import "./styles/styles.scss";
import { connect } from "react-redux";
import { Habit, getHabits } from "./redux/actions";
import { StoreState } from "./redux/reducers";
import HabitTracker from "./components/tracker/HabitTracker";
import Navbar from "./components/layout/Navbar";

interface AppProps {
  getHabits: Function;
}

const _App: React.FC<AppProps> = ({ getHabits }) => {
  useEffect(() => {
    getHabits();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <HabitTracker />
    </div>
  );
};

const mapStateToProps = ({ habits }: StoreState): { habits: Habit[] } => {
  return { habits };
};

export const App = connect(mapStateToProps, {
  getHabits,
})(_App);
