import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Toast from "./components/toast/Toast";
import HabitForm from "./components/tracker/HabitForm";
import HabitTracker from "./components/tracker/HabitTracker";
import { getHabits, getViewSelection, Habit } from "./redux/actions";
import { StoreState } from "./redux/reducers";
import ServiceWorkerWrapper from "./ServiceWorkerWrapper";
import "./styles/styles.scss";
import { KanbanBoard } from "./components/kanban/KanbanBoard";
interface AppProps {
  getHabits: Function;
  getViewSelection: Function;
}

const _App: React.FC<AppProps> = ({ getHabits, getViewSelection }) => {
  useEffect(() => {
    getHabits();
    getViewSelection();
  }, []);

  return (
    <div className='App'>
      <ServiceWorkerWrapper />
      <header>
        <Navbar />
      </header>
      <main>
        <section className='page-container'>
          <BrowserRouter>
            <Switch>
              <Route path='/kanban' exact component={KanbanBoard} />
              <Route path='/' exact component={HabitTracker} />
              <Route path='/about' exact render={() => <div>ABOUT</div>} />
            </Switch>
          </BrowserRouter>
        </section>
        <HabitForm />
        <Toast />
      </main>
    </div>
  );
};

// const mapStateToProps = ({ habits }: StoreState): { habits: Habit[] } => {
//   return { habits };
// };

export const App = connect(null, {
  getHabits,
  getViewSelection,
})(_App);
