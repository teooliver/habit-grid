import React, { useState, useRef, useEffect } from "react";
import DropDownMenu from "./DropDownMenu";
import { StoreState } from "../../../redux/reducers";
import { connect } from "react-redux";
import { months } from "../../../utils/variables";
import ChevronBarExpandIcon from "../../layout/icons/ChevronBarExpandIcon";

interface Props {
  selectedMonth: number;
}

const MonthYearDropdown: React.FC<Props> = ({ selectedMonth }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="MonthDropdown">
      <div onClick={() => setIsOpen(!isOpen)} onBlur={() => setIsOpen(false)}>
        <button className="dropdown-button">
          <span className="dropdown-button-text">
            {months[selectedMonth].toUpperCase()} / 2019
          </span>
          <ChevronBarExpandIcon
            className={`dropdown-button-icon ${isOpen ? "isOpen" : ""}`}
          />
        </button>
      </div>
      {isOpen && <DropDownMenu setIsOpen={setIsOpen} />}
    </div>
  );
};
const mapStateProps = ({ selectedMonth }: StoreState) => {
  return {
    selectedMonth: selectedMonth,
  };
};

export default connect(mapStateProps)(MonthYearDropdown);
