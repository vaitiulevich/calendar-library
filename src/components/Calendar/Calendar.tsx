import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarWrapper } from './styled';
import { BaseCalendar } from '@services/CalendarService';
import { HighlightTodayDecorator } from '@decorators/CalendarDecorator';
import Navigation from '@components/Navigation/Navigation';
import Weekdays from '@components/Weekdays/Weekdays';
import Days from '@components/Days/Days';
import YearsGrid from '@components/YearsGrid/YearsGrid';
import NavigationYears from '@components/NavigationYear/NavigationYear';

export interface IHoliday {
  title: string;
  date: Date;
}
export interface CalendarProps {
  type?: 'month' | 'week' | 'year';
  fillTodayColor?: string;
  fillHolidayColor?: string;
  label: string;
  startOfWeek?: 'sunday' | 'monday';
  rangeYears: [number, number];
  minDate?: Date;
  maxDate?: Date;
  isShowWeekDays?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  holidays?: IHoliday[];
}

const Calendar = ({
  type = 'month',
  minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  startOfWeek = 'monday',
  rangeYears = [2013, 2064],
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
  const [currentDecade, setCurrentDecade] = useState(
    () => Math.floor(today.getFullYear() / 10) * 10,
  );

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

  const handleSetDecade = (stepDecade: number) => {
    setCurrentDecade(currentDecade + stepDecade);
  };
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
      {type === 'month' ? (
        <>
          <Navigation
            currentDate={currentDate}
            onPrevMonth={() => handleSetMonth(currentDate.getMonth() - 1)}
            onNextMonth={() => handleSetMonth(currentDate.getMonth() + 1)}
            onPrevYear={() => handleSetYear(currentDate.getFullYear() - 1)}
            onNextYear={() => handleSetYear(currentDate.getFullYear() + 1)}
            rangeYears={rangeYears}
          />
          <Weekdays startOfWeek={startOfWeek} />
          <Days
            days={days}
            holidays={holidays}
            currentDate={currentDate}
            today={today}
            minDate={minDate}
            maxDate={maxDate}
            fillTodayColor={fillTodayColor}
            fillHolidayColor={fillHolidayColor}
            isShowWeekDays={isShowWeekDays}
          />
        </>
      ) : (
        <>
          <NavigationYears
            currentDecade={currentDecade}
            rangeYears={rangeYears}
            handleSetDecade={handleSetDecade}
          />
          <YearsGrid
            today={today}
            currentDecade={currentDecade}
            rangeYears={rangeYears}
            handleSetYear={handleSetYear}
          />
        </>
      )}
    </CalendarWrapper>
  );
};

export default Calendar;
