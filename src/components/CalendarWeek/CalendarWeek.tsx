import { memo, useCallback, useState } from 'react';
import React from 'react';
import { IHoliday } from '@components/Calendar/Calendar';
import { WeekStart } from '@services/CalendarEnums';
import DaysGrid from '@components/DaysGrid/DaysGrid';
import { defRange } from '@constants/constants';
import { useCalendarContext } from '@store/CalendarContext';
import NavigationWeek from '@components/NavigationWeek/NavigationWeek';
import useUpdateDaysForMonth from '@utils/useUpdateDaysForMonth';
import useWeeks from '@utils/useWeeks';

interface CalendarWeekProps {
  minDate?: number;
  maxDate?: number;
  fillTodayColor?: string;
  fillHolidayColor?: string;
  isShowWeekDays?: boolean;
  holidays?: IHoliday[];
  startOfWeek?: string;
  rangeYears?: [number, number];
}

const CalendarWeek = ({
  minDate,
  maxDate,
  fillTodayColor,
  fillHolidayColor,
  isShowWeekDays,
  holidays,
  startOfWeek = WeekStart.Monday,
  rangeYears = defRange,
}: CalendarWeekProps) => {
  const { currentDate, today, handleSetMonth } = useCalendarContext();

  const [weekOffset, setWeekOffset] = useState(() => {
    const today = new Date();
    return Math.floor(today.getDate() / 7);
  });

  const days = useUpdateDaysForMonth(
    rangeYears,
    startOfWeek,
    null,
    currentDate,
  );

  const handleSetWeek = useCallback((week: number) => {
    setWeekOffset(week);
  }, []);

  const weeks = useWeeks(days);
  const currentWeek = weeks[weekOffset];

  return (
    weeks.length > 0 && (
      <>
        <NavigationWeek
          currentDate={currentDate}
          rangeYears={rangeYears}
          handleSetMonth={handleSetMonth}
          handleSetWeek={handleSetWeek}
          weekOffset={weekOffset}
          weeks={weeks}
        />
        <DaysGrid
          days={currentWeek}
          minDate={minDate}
          maxDate={maxDate}
          currentDate={currentDate}
          today={today}
          fillHolidayColor={fillHolidayColor}
          fillTodayColor={fillTodayColor}
          holidays={holidays}
          isShowWeekDays={isShowWeekDays}
        />
      </>
    )
  );
};

export default memo(CalendarWeek);
