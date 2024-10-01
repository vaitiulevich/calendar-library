import React from 'react';
import { WeekStart } from '@services/CalendarEnums';
import { getDaysInMonth } from '@utils/getDaysInMonth';

const withCalendarEnhancements = (
  WrappedComponent: React.ComponentType<any>,
) => {
  return (props: any) => {
    const { currentDate, startOfWeek, minDate, maxDate, rangeYears } = props;

    const days = getDaysInMonth(currentDate, startOfWeek, rangeYears).map(
      (day) => ({
        date: day,
        isToday: day.toDateString() === new Date().toDateString(),
      }),
    );

    return <WrappedComponent {...props} days={days} />;
  };
};

export default withCalendarEnhancements;
