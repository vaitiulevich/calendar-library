import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarWrapper } from './styled';
import { BaseCalendar } from '@services/CalendarService';
import { HighlightTodayDecorator } from '@decorators/CalendarDecorator';
import Navigation from '@components/Navigation/Navigation';
import Weekdays from '@components/Weekdays/Weekdays';
import Days from '@components/Days/Days';

export interface CalendarProps {
  type?: 'basic' | 'secondary';
  textColor?: string;
  label: string;
  startOfWeek?: 'sunday' | 'monday';
  view?: 'month' | 'week';
  minDate?: Date;
  maxDate?: Date;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Calendar = ({
  type = 'basic',
  minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  startOfWeek = 'monday',
  view = 'month',
  textColor,
  onClick,
  label,
}: CalendarProps) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const baseCalendar = useMemo(() => new BaseCalendar(), []);
  const highlightTodayCalendar = useMemo(
    () => new HighlightTodayDecorator(baseCalendar),
    [baseCalendar],
  );

  const [days, setDays] = useState(
    baseCalendar.getDaysInMonth(currentDate, startOfWeek),
  );

  const isDateWithinRange = (day: Date) => {
    return (!minDate || day >= minDate) && (!maxDate || day <= maxDate);
  };

  const updateDaysForMonth = (date: Date) => {
    setDays(highlightTodayCalendar.getDaysInMonth(date, startOfWeek));
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
      <Navigation
        currentDate={currentDate}
        onPrev={() => handleSetMonth(currentDate.getMonth() - 1)}
        onNext={() => handleSetMonth(currentDate.getMonth() + 1)}
      />

      <Weekdays startOfWeek={startOfWeek} />

      <Days
        days={days}
        currentDate={currentDate}
        today={today}
        minDate={minDate}
        maxDate={maxDate}
      />
    </CalendarWrapper>
  );
};

export default Calendar;
