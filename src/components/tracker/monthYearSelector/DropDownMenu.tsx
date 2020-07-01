import React, { useState, useRef, useEffect } from "react";
import { months } from "../../../utils/variables";
import { StoreState } from "../../../redux/reducers";
import { connect } from "react-redux";
import { selectMonth } from "../../../redux/actions/selectMonth";
import ArrowBarRightIcon from "../../layout/icons/ArrowBarRightIcon";
import ArrowBarLeftIcon from "../../layout/icons/ArrowBarLeftIcon";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMonth: number;
  selectMonth: typeof selectMonth;
}

const DropDownMenu: React.FC<Props> = ({
  setIsOpen,
  selectMonth,
  selectedMonth,
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
        {/* {months.map((month) => {
          return <li className="menu-item">{month}</li>;
        })} */}
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
        <li className="menu-item">2019</li>
        <li className="menu-item">2020</li>
      </ul>
    </div>
  );
};
const mapStateProps = ({ selectedMonth }: StoreState) => {
  return {
    selectedMonth: selectedMonth,
  };
};

export default connect(mapStateProps, { selectMonth })(DropDownMenu);
