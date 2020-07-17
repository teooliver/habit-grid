import React, { useEffect } from "react";
import { connect } from "react-redux";
import HabitsTable from "./table-view/HabitsTable";
import { getHabits } from "../../redux/actions";
import HabitCardsView from "./individual-view/HabitCardsView";
import Control from "./control/Control";
import { StoreState } from "../../redux/reducers";
import { ViewOptions } from "../../redux/actions/types";
import { selectView } from "../../redux/actions/viewActions";

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
