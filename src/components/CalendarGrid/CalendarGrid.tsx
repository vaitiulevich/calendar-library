import { memo } from 'react';
import React from 'react';
import { IHoliday } from '@components/Calendar/Calendar';
import MonthGrid from '@components/MonthGrid';
import YearsGrid from '@components/YearsGrid/YearsGrid';
import { CalendarTypes, WeekStart } from '@services/CalendarEnums';

const CalendarGrid = ({
  type,
  days,
  currentDate,
  today,
  minDate,
  maxDate,
  fillTodayColor = '#007bff',
  fillHolidayColor = '#aa6af4',
  isShowWeekDays,
  holidays,
  startOfWeek = WeekStart.Monday,
  rangeYears,
  handleSetYear,
}: {
  type: string;
  days: Date[];
  currentDate: Date;
  today: Date;
  minDate?: Date;
  maxDate?: Date;
  fillTodayColor?: string;
  fillHolidayColor?: string;
  isShowWeekDays?: boolean;
  holidays?: IHoliday[];
  startOfWeek?: string;
  rangeYears: [number, number];
  handleSetYear: (year: number) => void;
}) => {
  switch (type) {
    case CalendarTypes.Month:
      return (
        <MonthGrid
          days={days}
          startOfWeek={startOfWeek}
          holidays={holidays}
          currentDate={currentDate}
          today={today}
          minDate={minDate}
          maxDate={maxDate}
          fillTodayColor={fillTodayColor}
          fillHolidayColor={fillHolidayColor}
          isShowWeekDays={isShowWeekDays}
        />
      );
    case CalendarTypes.Yaer:
      return (
        <YearsGrid
          today={today}
          currentYear={currentDate.getFullYear()}
          rangeYears={rangeYears}
          handleSetYear={handleSetYear}
        />
      );
  }
};

export default memo(CalendarGrid);
