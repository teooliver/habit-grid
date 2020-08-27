import React, { useEffect, useRef, useState } from "react";

interface CardDropdownProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardDropdown: React.FC<CardDropdownProps> = ({ setIsOpen }) => {
  const cardDropDownRef = useRef<HTMLDivElement>(null);

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
      cardDropDownRef.current != null &&
      !cardDropDownRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    } else {
      return;
    }
  };

  return (
    <div className='CardDropdown'>
      <div ref={cardDropDownRef} className='move-to-collumn-dropdown'>
        <ul className='active'>
          <li
            className='menu-item'
            onClick={() => {
              console.log("TODO");
            }}
          >
            <span>Todo</span>
          </li>
          <li
            className='menu-item'
            onClick={() => {
              console.log("In Progress");
            }}
          >
            <span>In Progress</span>
          </li>
          <li
            className='menu-item'
            onClick={() => {
              console.log("DONE");
            }}
          >
            <span>Done</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
