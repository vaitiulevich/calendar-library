import { memo } from 'react';
import React from 'react';
import { IHoliday } from '@components/Calendar/Calendar';
import DaysGrid from '@components/DaysGrid/DaysGrid';
import Navigation from '@components/Navigation/Navigation';
import { defRange } from '@constants/constants';
import useUpdateDaysForMonth from '@hooks/useUpdateDaysForMonth';
import { WeekStart } from '@services/CalendarEnums';
import { useCalendarContext } from '@store/CalendarContext';
import { Task } from '@store/ToDoContext';

export interface CalendarTypeProps {
  minDate?: number;
  maxDate?: number;
  fillTodayColor?: string;
  fillHolidayColor?: string;
  isShowWeekDays?: boolean;
  holidays?: IHoliday[];
  startOfWeek?: string;
  rangeYears?: [number, number];
  handleDayClick?: (day: Date | null) => void;
  selectedDay?: Date | null;
  tasks?: { [key: string]: Task[] };
  isInRange?: (date: string) => boolean;
  startDate?: Date;
  endDate?: Date;
}

const CalendarMonth: React.FC<CalendarTypeProps> = ({
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
  const { currentDate, today, handleSetMonth, handleSetYear } =
    useCalendarContext();

  const days = useUpdateDaysForMonth(
    rangeYears,
    startOfWeek,
    null,
    currentDate,
  );
  return (
    <>
      <Navigation
        currentDate={currentDate}
        onSetMonth={handleSetMonth}
        onSetYear={handleSetYear}
        rangeYears={rangeYears}
      />
      <DaysGrid
        days={days}
        tasks={tasks}
        startOfWeek={startOfWeek}
        holidays={holidays}
        currentDate={currentDate}
        handleDayClick={handleDayClick}
        today={today}
        minDate={minDate}
        maxDate={maxDate}
        fillTodayColor={fillTodayColor}
        fillHolidayColor={fillHolidayColor}
        isShowWeekDays={isShowWeekDays}
        selectedDay={selectedDay}
        isInRange={isInRange}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
};

export default memo(CalendarMonth);
