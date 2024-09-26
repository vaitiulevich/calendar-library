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
  handleSetYear,
}: {
  type: string;
  currentDate: Date;
  onSetMonth: (month: number) => void;
  onSetYear: (year: number) => void;
  handleSetYear: (year: number) => void;
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
          handleSetYear={handleSetYear}
        />
      );
  }
};

export default memo(CalendarHeader);
