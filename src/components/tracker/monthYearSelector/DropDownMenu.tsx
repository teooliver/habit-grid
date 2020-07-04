import React, { useState, useRef, useEffect } from "react";
import { months } from "../../../utils/variables";
import { StoreState } from "../../../redux/reducers";
import { connect } from "react-redux";
import { selectMonth, selectYear } from "../../../redux/actions/selectMonth";
import ArrowBarRightIcon from "../../layout/icons/ArrowBarRightIcon";
import ArrowBarLeftIcon from "../../layout/icons/ArrowBarLeftIcon";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMonth: number;
  selectMonth: typeof selectMonth;
  selectYear: typeof selectYear;
  possibleYearOptions: number[];
}

const DropDownMenu: React.FC<Props> = ({
  setIsOpen,
  selectMonth,
  selectedMonth,
  possibleYearOptions,
}) => {
  const [activeMenu, setActiveMenu] = useState("main");
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", (e) => handleClickOutside(e));
    return () => {
      document.removeEventListener("click", (e) => handleClickOutside(e));
    };
  }, []);

  const handleClickOutside: Function = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      dropDownRef.current != null &&
      !dropDownRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    } else {
      return;
    }
  };

  console.log(possibleYearOptions);

  return (
    <div ref={dropDownRef} className="dropdown">
      <ul className={` ${activeMenu === "main" ? "active" : "inactive"}`}>
        <li className="menu-item" onClick={() => setActiveMenu("month")}>
          Month <ArrowBarRightIcon />
        </li>
        <li className="menu-item" onClick={() => setActiveMenu("year")}>
          Year <ArrowBarRightIcon />
        </li>
      </ul>

      <ul className={` ${activeMenu === "month" ? "active" : "inactive"}`}>
        <li className="menu-item" onClick={() => setActiveMenu("main")}>
          <ArrowBarLeftIcon />
          Back
        </li>
        {months.map((month, index) => {
          return (
            <li className={selectedMonth === index ? "active" : ""}>
              <button
                key={index}
                onClick={() => {
                  selectMonth(index);
                }}
              >
                {month}
              </button>
            </li>
          );
        })}
      </ul>

      <ul className={` ${activeMenu === "year" ? "active" : "inactive"}`}>
        <li className="menu-item" onClick={() => setActiveMenu("main")}>
          <ArrowBarLeftIcon />
          Back
        </li>
        {possibleYearOptions.map((year, index) => {
          return (
            <li className={selectedMonth === index ? "active" : ""}>
              <button
                key={index}
                onClick={() => {
                  selectYear(year);
                }}
              >
                {year}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
const mapStateProps = ({ selectedMonth }: StoreState) => {
  return {
    selectedMonth: selectedMonth.selectedMonth,
  };
};

export default connect(mapStateProps, { selectMonth, selectYear })(
  DropDownMenu
);
