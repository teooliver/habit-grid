import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Navbar from './components/layout/Navbar';
import Toast from './components/Toast/Toast';
import { getHabits, getViewSelection, getBoards } from './redux/actions';
import ServiceWorkerWrapper from './ServiceWorkerWrapper';
import './styles/styles.scss';

import { AppRoutes } from './AppRoutes';

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
  }, [getBoards, getHabits, getViewSelection]);

  return (
    <div className="App" data-testid="app-test">
      <ServiceWorkerWrapper />
      <header>
        <Navbar />
      </header>
      <main>
        <AppRoutes />
      </main>
      <Toast />
    </div>
  );
};

export const App = connect(null, {
  getHabits,
  getViewSelection,
  getBoards,
})(_App);
