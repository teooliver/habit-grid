import React, { useState, useRef, useEffect } from "react";
import DropDownMenu from "./DropDownMenu";
import ChevronBarExpand from "../../layout/icons/ChevronBarExpand";
import { StoreState } from "../../../redux/reducers";
import { connect } from "react-redux";
import { months } from "../../../utils/variables";

interface Props {
  selectedMonth: number;
}

const MonthYearDropdown: React.FC<Props> = ({ selectedMonth }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="MonthDropdown">
      <div onClick={() => setOpen(!open)} onBlur={() => setOpen(false)}>
        <button className="dropdown-button">
          <span className="dropdown-button-text">
            {months[selectedMonth].toUpperCase()} / 2019
          </span>
          <ChevronBarExpand className="dropdown-button-icon" />
        </button>
      </div>
      {open && <DropDownMenu setOpen={setOpen} />}
    </div>
  );
};
const mapStateProps = ({ selectedMonth }: StoreState) => {
  return {
    selectedMonth: selectedMonth,
  };
};

export default connect(mapStateProps)(MonthYearDropdown);
