import React from 'react';
import { connect } from 'react-redux';
import { getHabits, Habit } from '../redux/actions';
import { StoreState } from '../redux/reducers';
import { ViewOptions } from '../redux/actions/types';
import Control from '../components/tracker/control/Control';
import HabitCardsView from '../components/tracker/individual-view/HabitCardsView';
import HabitsTable from '../components/tracker/table-view/HabitsTable';
import { ReactComponent as StabilityBall } from '../images/undraw_Stability_ball_b4ia.svg';
import HabitForm from '../components/tracker/HabitForm';

interface Props {
  selectedView: ViewOptions;
  habits: Habit[];
}

const HabitTracker: React.FC<Props> = ({ selectedView, habits }) => {
  return (
    <div data-testid="habits">
      <Control />
      {habits.length !== 0 ? (
        selectedView === 'table' ? (
          <HabitsTable />
        ) : (
          <HabitCardsView />
        )
      ) : (
        <div className="splash-screen">
          <StabilityBall />
        </div>
      )}
      <HabitForm />
    </div>
  );
};

const mapStateToProps = ({ selectedView, habits }: StoreState) => {
  return {
    selectedView,
    habits,
  };
};

export default connect(mapStateToProps, { getHabits })(HabitTracker);
