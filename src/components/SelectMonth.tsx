import React, { FC } from "react";
import { connect } from "react-redux";
import { selectMonth } from "../redux/actions/selectMonth";
import { StoreState } from "../redux/reducers";

interface Props {
  selectedMonth: number;
}

const SelectMonth: FC<Props> = ({ selectedMonth }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="SelectMonth">
      {months.map((month, index) => {
        if (selectedMonth === index) {
          return (
            <button
              className="active"
              onClick={() => {
                selectMonth(index);
              }}
            >
              {month}
            </button>
          );
        }
        return (
          <button
            onClick={() => {
              selectMonth(index);
            }}
          >
            {month}
          </button>
        );
      })}
    </div>
  );
};

const mapStateProps = ({ selectedMonth }: StoreState) => {
  return {
    selectedMonth: selectedMonth,
  };
};

export default connect(mapStateProps, { selectMonth })(SelectMonth);
