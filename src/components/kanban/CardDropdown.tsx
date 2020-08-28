import React, { useEffect, useRef } from "react";

interface CardDropdownProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardColumns: string[];
}

export const CardDropdown: React.FC<CardDropdownProps> = ({
  setIsOpen,
  boardColumns,
}) => {
  const cardDropDownRef = useRef<HTMLUListElement>(null);

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
    <ul ref={cardDropDownRef} className='dropdown-list'>
      {boardColumns.length > 0 &&
        boardColumns.map((column) => (
          <li
            className='menu-item'
            onClick={() => {
              setIsOpen(false);
              console.log(column);
            }}
          >
            <span>{column}</span>
          </li>
        ))}
    </ul>
  );
};
