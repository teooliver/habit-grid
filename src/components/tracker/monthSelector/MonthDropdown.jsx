import React, { useState, useRef, useEffect } from "react";
import DropDownMenu from "./DropDownMenu";
import ChevronBarExpand from "../../layout/icons/ChevronBarExpand";

const MonthDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="MonthDropdown">
      <div onClick={() => setOpen(!open)} onBlur={() => setOpen(false)}>
        <button className="dropdown-button">
          <span className="dropdown-button-text">Jun / 2019</span>
          <ChevronBarExpand className="dropdown-button-icon" />
        </button>
      </div>
      {open && <DropDownMenu setOpen={setOpen} />}
    </div>
  );
};

export default MonthDropdown;
