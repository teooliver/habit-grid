import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { StoreState } from "../redux/reducers";
import { Habit } from "../redux/actions";
import { getHabits } from "../redux/actions";

interface MainTableProps {
  getHabits: Function;
}

export const MainTable: React.FC<MainTableProps> = ({ getHabits }) => {
  useEffect(() => {
    getHabits();
  }, []);

  return <div></div>;
};

const mapStateToProps = ({ habits }: StoreState): { habits: Habit[] } => {
  return {
    habits,
  };
};

export default connect(mapStateToProps, { getHabits })(MainTable);
