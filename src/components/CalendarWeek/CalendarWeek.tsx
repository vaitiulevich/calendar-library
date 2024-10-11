import { memo, useCallback, useEffect, useState } from 'react';
import React from 'react';
import { CalendarTypeProps } from '@components/CalendarMonth/CalendarMonth';
import DaysGrid from '@components/DaysGrid/DaysGrid';
import NavigationWeek from '@components/NavigationWeek/NavigationWeek';
import { defRange } from '@constants/constants';
import useUpdateDaysForMonth from '@hooks/useUpdateDaysForMonth';
import useWeeks from '@hooks/useWeeks';
import { WeekStart } from '@services/CalendarEnums';
import { useCalendarContext } from '@store/CalendarContext';

const CalendarWeek: React.FC<CalendarTypeProps> = ({
  minDate,
  maxDate,
  fillTodayColor,
  fillHolidayColor,
  isShowWeekDays,
  holidays,
  startOfWeek = WeekStart.Monday,
  rangeYears = defRange,
  handleDayClick,
  selectedDay,
  tasks,
  isInRange,
  startDate,
  endDate,
}) => {
  const { currentDate, today, handleSetMonth } = useCalendarContext();

  const [weekOffset, setWeekOffset] = useState(() => {
    const today = new Date();
    return Math.ceil(today.getDate() / 7) - 1;
  });

  const days = useUpdateDaysForMonth(
    rangeYears,
    startOfWeek,
    null,
    currentDate,
  );

  useEffect(() => {
    const day = selectedDay ?? today;
    let weekNum = Math.ceil(day.getDate() / 7);
    if (!selectedDay) {
      weekNum = weekNum - 1;
    }
    setWeekOffset(weekNum);
  }, [selectedDay]);

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
          tasks={tasks}
          startOfWeek={startOfWeek}
          handleDayClick={handleDayClick}
          selectedDay={selectedDay}
          isInRange={isInRange}
          startDate={startDate}
          endDate={endDate}
        />
      </>
    )
  );
};

export default memo(CalendarWeek);
