import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarWrapper } from './styled';
// import { BaseCalendar } from '@services/CalendarService';
// import { HighlightTodayDecorator } from '@decorators/CalendarDecorator';
import CalendarHeader from '@components/CalendarHeader/CalendarHeader';
import CalendarGrid from '@components/CalendarGrid/CalendarGrid';
import { CalendarTypes, WeekStart } from '@services/CalendarEnums';
import { defMaxDate, defMinDate, defRange } from '@constants/constants';
import { useCalendar } from '@utils/useCalendar';

export interface IHoliday {
  title: string;
  date: Date;
}
export interface CalendarProps {
  type?: CalendarTypes.Month | CalendarTypes.Week | CalendarTypes.Yaer;
  fillTodayColor?: string;
  fillHolidayColor?: string;
  label: string;
  startOfWeek?: WeekStart.Sunday | WeekStart.Monday;
  rangeYears: [number, number];
  minDate?: Date;
  maxDate?: Date;
  isShowWeekDays?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  holidays?: IHoliday[];
}

const Calendar = ({
  type = CalendarTypes.Month,
  minDate = defMinDate,
  maxDate = defMaxDate,
  startOfWeek = WeekStart.Monday,
  rangeYears = defRange,
  fillTodayColor = '#007bff',
  fillHolidayColor,
  isShowWeekDays = false,
  holidays,
  onClick,
  label,
}: CalendarProps) => {
  const today = new Date();

  const { currentDate, days, handleSetMonth, handleSetYear } = useCalendar(
    today,
    startOfWeek,
    minDate,
    maxDate,
    rangeYears,
  );

  return (
    <CalendarWrapper>
      <CalendarHeader
        type={type}
        currentDate={currentDate}
        onSetMonth={handleSetMonth}
        onSetYear={handleSetYear}
        rangeYears={rangeYears}
      />

      <CalendarGrid
        type={type}
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
    </CalendarWrapper>
  );
};

export default Calendar;
