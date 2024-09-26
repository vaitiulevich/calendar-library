import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarWrapper } from './styled';
import { BaseCalendar } from '@services/CalendarService';
import { HighlightTodayDecorator } from '@decorators/CalendarDecorator';
import CalendarHeader from '@components/CalendarHeader/CalendarHeader';
import CalendarGrid from '@components/CalendarGrid/CalendarGrid';
import { CalendarTypes, WeekStart } from '@services/CalendarEnums';
import { defMaxDate, defMinDate, defRange } from '@constants/constants';

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
  const [currentDate, setCurrentDate] = useState(() => {
    const year = today.getFullYear();
    if (rangeYears) {
      if (year < rangeYears[0] || year > rangeYears[1]) {
        return new Date(rangeYears[0], 0, 1);
      }
    }
    return today;
  });

  const baseCalendar = useMemo(() => new BaseCalendar(), []);
  const highlightTodayCalendar = useMemo(
    () => new HighlightTodayDecorator(baseCalendar),
    [baseCalendar],
  );

  const [days, setDays] = useState(
    baseCalendar.getDaysInMonth(
      currentDate,
      startOfWeek,
      minDate,
      maxDate,
      rangeYears,
    ),
  );

  const updateDaysForMonth = (date: Date) => {
    setDays(
      highlightTodayCalendar.getDaysInMonth(
        date,
        startOfWeek,
        minDate,
        maxDate,
        rangeYears,
      ),
    );
  };

  const handleSetMonth = useCallback(
    (selectMonth: number) => {
      setCurrentDate((prevDate) => {
        const newDate = new Date(prevDate.getFullYear(), selectMonth, 1);
        updateDaysForMonth(newDate);
        return newDate;
      });
    },
    [updateDaysForMonth],
  );

  const handleSetYear = useCallback(
    (selectYear: number) => {
      setCurrentDate((prevDate) => {
        const newDate = new Date(selectYear, prevDate.getMonth(), 1);
        updateDaysForMonth(newDate);
        return newDate;
      });
    },
    [updateDaysForMonth],
  );

  useEffect(() => {
    setDays(
      new HighlightTodayDecorator(new BaseCalendar()).getDaysInMonth(
        currentDate,
        startOfWeek,
      ),
    );
  }, [startOfWeek]);

  return (
    <CalendarWrapper>
      <CalendarHeader
        type={type}
        currentDate={currentDate}
        onSetMonth={handleSetMonth}
        onSetYear={handleSetYear}
        rangeYears={rangeYears}
        handleSetYear={handleSetYear}
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
        rangeYears={rangeYears}
        handleSetYear={handleSetYear}
      />
    </CalendarWrapper>
  );
};

export default Calendar;
