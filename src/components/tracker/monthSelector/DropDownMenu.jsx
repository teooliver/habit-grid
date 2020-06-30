import React, { useState, useRef, useEffect } from "react";
import { months } from "../../../utils/variables.tsx";

const DropDownMenu = ({ setOpen }) => {
  const [activeMenu, setActiveMenu] = useState("main");
  const dropDownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (!dropDownRef.current.contains(e.target)) {
      setOpen(false);
    } else {
      return;
    }
  };

  return (
    <div ref={dropDownRef} className="dropdown">
      <ul className={` ${activeMenu === "main" ? "active" : "inactive"}`}>
        <li className="menu-item" onClick={() => setActiveMenu("month")}>
          Month --
        </li>
        <li className="menu-item" onClick={() => setActiveMenu("year")}>
          Year --
        </li>
      </ul>

      <ul className={` ${activeMenu === "month" ? "active" : "inactive"}`}>
        <li className="menu-item" onClick={() => setActiveMenu("main")}>
          Back
        </li>
        {months.map((month) => {
          return <li className="menu-item">{month}</li>;
        })}
      </ul>

      <ul className={` ${activeMenu === "year" ? "active" : "inactive"}`}>
        <li className="menu-item" onClick={() => setActiveMenu("main")}>
          Back
        </li>
        <li className="menu-item">2019</li>
        <li className="menu-item">2020</li>
      </ul>
    </div>
  );
};

export default DropDownMenu;
