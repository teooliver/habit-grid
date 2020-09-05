import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Toast from './components/toast/Toast';
import HabitTracker from './pages/HabitTracker';
import { getHabits, getViewSelection, getBoards } from './redux/actions';
import ServiceWorkerWrapper from './ServiceWorkerWrapper';
import './styles/styles.scss';

import PageNotFound from './pages/PageNotFound';
import Boards from './pages/Boards';

interface AppProps {
  getHabits: Function;
  getViewSelection: Function;
  getBoards: Function;
}

const _App: React.FC<AppProps> = ({
  getHabits,
  getViewSelection,
  getBoards,
}) => {
  useEffect(() => {
    getHabits();
    getViewSelection();
    getBoards();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ServiceWorkerWrapper />
        <header>
          <Navbar />
        </header>
        <main>
          <section className="page-container">
            <Switch>
              <Route path="/kanban" exact component={Boards} />
              <Route path="/" exact component={HabitTracker} />
              <Route path="/about" exact render={() => <div>ABOUT</div>} />
              <Route path="/" render={PageNotFound} />
            </Switch>
          </section>

          <Toast />
        </main>
      </BrowserRouter>
    </div>
  );
};

export const App = connect(null, {
  getHabits,
  getViewSelection,
  getBoards,
})(_App);
