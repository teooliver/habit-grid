import React, { useState, useRef, useEffect } from "react";
import DropDownMenu from "./DropDownMenu";

const MonthDropdown = () => {
  const [open, setOpen] = useState(false);

  // ref={dropDownRef}
  return (
    <div className="MonthDropdown">
      <div onClick={() => setOpen(!open)} onBlur={() => setOpen(false)}>
        <p>Jun / 2019</p>
      </div>
      {open && <DropDownMenu setOpen={setOpen} />}
    </div>
  );
};

export default MonthDropdown;
