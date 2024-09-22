import { memo, useMemo } from 'react';
import React from 'react';
import { WeekdaysRow } from './styled';
import { WeekStart } from '@services/CalendarService';

const weekdaysSundayStart = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const weekdaysMondayStart = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

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
