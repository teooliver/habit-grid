import React, { useEffect } from "react";
import "./styles/styles.scss";
import { connect } from "react-redux";
import { StoreState } from "./redux/reducers";
import { Habit, getHabits } from "./redux/actions";
import HabitTracker from "./components/tracker/HabitTracker";
import Navbar from "./components/layout/Navbar";
import HabitForm from "./components/tracker/HabitForm";
interface AppProps {
  getHabits: Function;
}

const _App: React.FC<AppProps> = ({ getHabits }) => {
  useEffect(() => {
    getHabits();
  }, []);

  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <section className="page-container">
          <HabitTracker />
        </section>
        <HabitForm />
      </main>
    </div>
  );
};

const mapStateToProps = ({ habits }: StoreState): { habits: Habit[] } => {
  return { habits };
};

export const App = connect(mapStateToProps, {
  getHabits,
})(_App);
