import { memo } from 'react';
import React from 'react';
import { DayButton, DaysGridContainer } from './styled';
import { IHoliday } from '@components/Calendar/Calendar';
import Weekdays from '@components/Weekdays/Weekdays';
import { WeekStart } from '@services/CalendarEnums';
import { isHoliday, isWeekday } from '@utils/CalendarDayTypes';

interface IDays {
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
}

export interface ICalendar {
  getDaysInMonth(
    date: Date,
    startOfWeek: string,
    minDate?: Date,
    maxDate?: Date,
    rangeYears?: [number, number],
  ): Date[];
}

const DaysGrid = ({
  days,
  currentDate,
  today,
  minDate = new Date(2024, 8, 10),
  maxDate = new Date(2024, 8, 20),
  fillTodayColor = '#007bff',
  fillHolidayColor,
  isShowWeekDays,
  holidays,
  startOfWeek = WeekStart.Monday,
}: IDays) => {
  const renderDays = () => {
    return days.map((day, index) => {
      const isCurrentMontDay = day.getMonth() === currentDate.getMonth();
      const isDisabled =
        !isCurrentMontDay ||
        day.getFullYear() !== currentDate.getFullYear() ||
        (minDate && day.getTime() < minDate.getTime()) ||
        (maxDate && day.getTime() > maxDate.getTime());
      const isHolidayDate = isHoliday(day, holidays);
      const isWeekDay = (isShowWeekDays && isWeekday(day)) ?? false;
      const isToday = day.toDateString() === today.toDateString();
      return (
        <DayButton
          key={index}
          istoday={isToday}
          isweekday={isWeekDay}
          isholiday={isHolidayDate}
          filltoday={fillTodayColor}
          fillholiday={fillHolidayColor}
          ismothday={isCurrentMontDay}
          disabled={isDisabled}
        >
          {day.getDate()}
        </DayButton>
      );
    });
  };
  return (
    <>
      <Weekdays startOfWeek={startOfWeek} />
      <DaysGridContainer>{renderDays()}</DaysGridContainer>
    </>
  );
};

export default memo(DaysGrid);
