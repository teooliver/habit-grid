import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../../redux/reducers";
import { Habit } from "../../../redux/actions/habits";
import HabitCard from "./HabitCard";

interface Props {
  habits: Habit[];
}

const HabitCardsView: React.FC<Props> = ({ habits }) => {
  return (
    <section className='HabitCardsView'>
      {habits.length !== 0 ? (
        habits.map((habit, index) => {
          return <HabitCard habit={habit} index={index} key={index} />;
        })
      ) : (
        <div className='splash-screen'>{/* <StabilityBall /> */}</div>
      )}
    </section>
  );
};

const mapStateToProps = ({ habits }: StoreState) => {
  return {
    habits,
  };
};

export default connect(mapStateToProps)(HabitCardsView);
