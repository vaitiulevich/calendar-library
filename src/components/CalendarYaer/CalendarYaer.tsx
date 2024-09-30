import { memo } from 'react';
import React from 'react';
import { IHoliday } from '@components/Calendar/Calendar';
import YearsGrid from '@components/YearsGrid/YearsGrid';
import { WeekStart } from '@services/CalendarEnums';
import { defRange } from '@constants/constants';
import { useCalendarContext } from '@store/CalendarContext';
import NavigationYear from '@components/NavigationYear/NavigationYear';

interface CalendarMonthProps {
  minDate?: number;
  maxDate?: number;
  fillTodayColor?: string;
  fillHolidayColor?: string;
  isShowWeekDays?: boolean;
  holidays?: IHoliday[];
  startOfWeek?: string;
  rangeYears?: [number, number];
}

const CalendarYaer = ({
  minDate,
  maxDate,
  fillTodayColor,
  fillHolidayColor,
  isShowWeekDays,
  holidays,
  startOfWeek = WeekStart.Monday,
  rangeYears = defRange,
}: CalendarMonthProps) => {
  const { currentDate, handleSetYear } = useCalendarContext();
  return (
    <>
      <NavigationYear
        currentYear={currentDate.getFullYear()}
        rangeYears={rangeYears}
        handleSetYear={handleSetYear}
      />
      <YearsGrid
        startOfWeek={startOfWeek}
        minDate={minDate}
        maxDate={maxDate}
        isShowWeekDays={isShowWeekDays}
        holidays={holidays}
        rangeYears={rangeYears}
        fillTodayColor={fillTodayColor}
        fillHolidayColor={fillHolidayColor}
      />
    </>
  );
};

export default memo(CalendarYaer);
