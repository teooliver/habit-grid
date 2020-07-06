import React, { FC } from "react";

interface Props {
  className?: string;
}

const ArrowDownIcon: FC<Props> = ({ className }) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className={className || "bi-arrow-down"}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"
      />
      <path
        fillRule="evenodd"
        d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"
      />
    </svg>
  );
};

export default ArrowDownIcon;
