import { memo } from 'react';
import React from 'react';
import { IHoliday } from '@components/Calendar/Calendar';
import YearsGrid from '@components/YearsGrid/YearsGrid';
import { CalendarTypes, WeekStart } from '@services/CalendarEnums';
import withCalendarEnhancements from '@decorators/withCalendarEnhancements';
import MonthGrid from '@components/MonthGrid/MonthGrid';

interface IWeekStartProps {
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
}

const CalendarGrid = ({
  type,
  days,
  currentDate,
  today,
  minDate,
  maxDate,
  fillTodayColor,
  fillHolidayColor,
  isShowWeekDays,
  holidays,
  startOfWeek = WeekStart.Monday,
}: IWeekStartProps) => {
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
          fillTodayColor={fillTodayColor}
          fillHolidayColor={fillHolidayColor}
          currentYear={currentDate.getFullYear()}
        />
      );
  }
};

export default memo(CalendarGrid);
