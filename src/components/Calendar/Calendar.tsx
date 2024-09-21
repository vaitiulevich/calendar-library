import React from 'react';

export interface CalendarProps {
  type?: 'basic' | 'secondary';
  textColor?: string;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Calendar = ({
  type = 'basic',
  textColor,
  onClick,
  label,
}: CalendarProps) => {
  return (
    // <button
    //   type="button"
    //   style={textColor ? { color: textColor } : {}}
    //   onClick={onClick}
    // >
    //   {label}
    // </button>
    <div>{label}</div>
  );
};

export default Calendar;
