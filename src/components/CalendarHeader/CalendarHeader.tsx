import { memo, useState } from 'react';
import React from 'react';
import Navigation from '@components/Navigation/Navigation';
import NavigationYears from '@components/NavigationYear/NavigationYear';
import { CalendarTypes } from '@services/CalendarEnums';

const CalendarHeader = ({
  type,
  currentDate,
  onSetYear,
  onSetMonth,
  rangeYears,
}: {
  type: string;
  currentDate: Date;
  onSetMonth: (month: number) => void;
  onSetYear: (year: number) => void;
  rangeYears: [number, number];
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
  }
};

export default memo(CalendarHeader);
