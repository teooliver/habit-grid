import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getHabits } from "../../redux/actions";
import { StoreState } from "../../redux/reducers";
import { ViewOptions } from "../../redux/actions/types";
import Control from "./control/Control";
import HabitCardsView from "./individual-view/HabitCardsView";
import HabitsTable from "./table-view/HabitsTable";

interface Props {
  selectedView: ViewOptions;
}

const HabitTracker: React.FC<Props> = ({ selectedView }) => {
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
      {switchViews(selectedView)}
    </>
  );
};

const mapStateToProps = ({ selectedView }: StoreState) => {
  return {
    selectedView,
  };
};

export default connect(mapStateToProps, { getHabits })(HabitTracker);
