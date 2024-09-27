import { memo } from 'react';
import React from 'react';
import { IHoliday } from '@components/Calendar/Calendar';
import YearsGrid from '@components/YearsGrid/YearsGrid';
import { CalendarTypes, WeekStart } from '@services/CalendarEnums';
import withCalendarEnhancements from '@decorators/withCalendarEnhancements';
import DaysGrid from '@components/DaysGrid/DaysGrid';

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
  weeks: Date[];
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
  weeks,
}: IWeekStartProps) => {
  console.log(weeks);
  switch (type) {
    case CalendarTypes.Month:
      return (
        <DaysGrid
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
    case CalendarTypes.Week:
      return (
        <DaysGrid
          days={weeks || days}
          currentDate={currentDate}
          today={today}
        />
      );
  }
};

export default memo(CalendarGrid);
