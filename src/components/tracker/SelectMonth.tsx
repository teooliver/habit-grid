import React, { FC } from "react";
import { connect } from "react-redux";
import { selectMonth } from "../../redux/actions/selectMonth";
import { StoreState } from "../../redux/reducers";
import { months } from "../../utils/variables";

interface Props {
  selectedMonth: number;
  selectMonth: typeof selectMonth;
}

const SelectMonth: FC<Props> = ({ selectedMonth, selectMonth }) => {
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
