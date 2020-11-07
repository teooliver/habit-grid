import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Boards from './pages/Boards';
import { Home } from './pages/Home';
import HabitTracker from './pages/HabitTracker';

const AppRoutes = () => {
  return (
    <>
      <section className="page-container">
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/" exact component={HabitTracker} />
          <Route path="/boards" exact component={Boards} />
          <Route path="/about" exact render={() => <div>ABOUT</div>} />
          <Route path="/" render={PageNotFound} />
        </Switch>
      </section>
    </>
  );
};

export { AppRoutes };
