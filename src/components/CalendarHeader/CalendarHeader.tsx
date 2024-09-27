import { memo, useState } from 'react';
import React from 'react';
import Navigation from '@components/Navigation/Navigation';
import NavigationYears from '@components/NavigationYear/NavigationYear';
import { CalendarTypes } from '@services/CalendarEnums';
import NavigationWeek from '@components/NavigationWeek/NavigationWeek';

const CalendarHeader = ({
  type,
  currentDate,
  onSetYear,
  onSetMonth,
  onSetWeek,
  rangeYears,
  today,
  days,
  weekOffset,
  weeks,
}: {
  type: string;
  currentDate: Date;
  onSetMonth: (month: number) => void;
  onSetYear: (year: number) => void;
  onSetWeek: (week: number) => void;
  rangeYears: [number, number];
  today: Date;
  days: Date[];
  weekOffset: number;
  weeks: Date[][];
}) => {
  switch (type) {
    case CalendarTypes.Month:
      return (
        <Navigation
          currentDate={currentDate}
          onSetMonth={onSetMonth}
          onSetYear={onSetYear}
          rangeYears={rangeYears}
        />
      );
    case CalendarTypes.Yaer:
      return (
        <NavigationYears
          currentYear={currentDate.getFullYear()}
          rangeYears={rangeYears}
          handleSetYear={onSetYear}
        />
      );
    case CalendarTypes.Week:
      return (
        <NavigationWeek
          currentDate={currentDate}
          rangeYears={rangeYears}
          handleSetMonth={onSetMonth}
          handleSetWeek={onSetWeek}
          weekOffset={weekOffset}
          weeks={weeks}
        />
      );
  }
};

export default memo(CalendarHeader);
