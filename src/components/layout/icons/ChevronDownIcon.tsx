import React, { FC } from 'react';

interface Props {
  className?: string;
}

const ChevronDownIcon: FC<Props> = ({ className }) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className={className || 'bi bi-chevron-down'}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );
};

export default ChevronDownIcon;
