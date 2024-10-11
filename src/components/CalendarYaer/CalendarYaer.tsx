import { memo } from 'react';
import React from 'react';
import { CalendarTypeProps } from '@components/CalendarMonth/CalendarMonth';
import NavigationYear from '@components/NavigationYear/NavigationYear';
import YearsGrid from '@components/YearsGrid/YearsGrid';
import { defRange } from '@constants/constants';
import { WeekStart } from '@services/CalendarEnums';
import { useCalendarContext } from '@store/CalendarContext';

const CalendarYaer: React.FC<CalendarTypeProps> = ({
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
  const { currentDate, handleSetYear, today } = useCalendarContext();
  return (
    <>
      <NavigationYear
        currentYear={currentDate.getFullYear()}
        rangeYears={rangeYears}
        handleSetYear={handleSetYear}
      />
      <YearsGrid
        tasks={tasks}
        startOfWeek={startOfWeek}
        minDate={minDate}
        maxDate={maxDate}
        isShowWeekDays={isShowWeekDays}
        holidays={holidays}
        rangeYears={rangeYears}
        fillTodayColor={fillTodayColor}
        fillHolidayColor={fillHolidayColor}
        handleDayClick={handleDayClick}
        selectedDay={selectedDay}
        isInRange={isInRange}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
};

export default memo(CalendarYaer);
