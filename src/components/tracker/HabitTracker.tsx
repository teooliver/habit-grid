import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getHabits, Habit } from "../../redux/actions";
import { StoreState } from "../../redux/reducers";
import { ViewOptions } from "../../redux/actions/types";
import Control from "./control/Control";
import HabitCardsView from "./individual-view/HabitCardsView";
import HabitsTable from "./table-view/HabitsTable";
import { ReactComponent as StabilityBall } from "../../images/undraw_Stability_ball_b4ia.svg";
import Toast from "../toast/Toast";

interface Props {
  selectedView: ViewOptions;
  habits: Habit[];
}

const HabitTracker: React.FC<Props> = ({ selectedView, habits }) => {
  // THis should go to APP
  useEffect(() => {
    getHabits();
  }, []);

  const switchViews = (view: ViewOptions) => {
    switch (view) {
      case "table":
        return (
          <section className='habits-table-container'>
            <HabitsTable />
          </section>
        );
      case "individual":
        return (
          <section className='habit-cards-container'>
            <HabitCardsView />
          </section>
        );
      default:
        return (
          <section className='habits-table-container'>
            <HabitsTable />
          </section>
        );
    }
  };

  return (
    <>
      <Control />
      {habits.length !== 0 ? (
        switchViews(selectedView)
      ) : (
        <div className='splash-screen'>
          <StabilityBall />
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ selectedView, habits }: StoreState) => {
  return {
    selectedView,
    habits,
  };
};

export default connect(mapStateToProps, { getHabits })(HabitTracker);
