import { memo, useMemo } from 'react';
import React from 'react';
import { weekdaysMondayStart, weekdaysSundayStart } from '@constants/constants';
import { WeekStart } from '@services/CalendarEnums';

import { WeekdaysRow } from './styled';

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
