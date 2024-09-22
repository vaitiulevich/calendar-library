import { memo } from 'react';
import React from 'react';
import { WeekStart } from '@services/CalendarService';
import { DayButton, DaysGrid } from './styled';

interface IDays {
  days: Date[];
  currentDate: Date;
  today: Date;
  minDate: Date;
  maxDate: Date;
}

const Days = ({ days, currentDate, today, minDate, maxDate }: IDays) => {
  const renderDays = () => {
    return days.map((day, index) => {
      const isDisabled = !isDateWithinRange(day);

      return (
        <DayButton
          key={index}
          istoday={day.toDateString() === today.toDateString()}
          isdisabled={day.getMonth() === currentDate.getMonth()}
          disabled={isDisabled}
        >
          {day.getDate()}
        </DayButton>
      );
    });
  };
  const isDateWithinRange = (day: Date) => {
    return (!minDate || day >= minDate) && (!maxDate || day <= maxDate);
  };

  return <DaysGrid>{renderDays()}</DaysGrid>;
};

export default memo(Days);
