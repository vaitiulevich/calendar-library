import { memo, useMemo } from 'react';
import React from 'react';
import { WeekdaysRow } from './styled';
import { WeekStart } from '@services/CalendarService';
import { weekdaysMondayStart, weekdaysSundayStart } from '@constants/constants';

const Weekdays = ({ startOfWeek }: { startOfWeek: string }) => {
  const weekdays = useMemo(
    () =>
      startOfWeek === WeekStart.Monday
        ? weekdaysMondayStart
        : weekdaysSundayStart,
    [startOfWeek],
  );

  const renderWeekdaysRow = () => {
    return weekdays.map((day) => <span key={day}>{day}</span>);
  };
  return <WeekdaysRow>{renderWeekdaysRow()}</WeekdaysRow>;
};

export default memo(Weekdays);
