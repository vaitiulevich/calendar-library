import { memo } from 'react';
import React from 'react';
import { DayButton, DaysGrid } from './styled';
import { IHoliday } from '@components/Calendar/Calendar';
import Weekdays from '@components/Weekdays/Weekdays';
import { WeekStart } from '@services/CalendarEnums';
import { isHoliday, isWeekday } from '@utils/CalendarDayTypes';

interface IMonth {
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

const MonthGrid = ({
  days,
  currentDate,
  today,
  minDate,
  maxDate,
  fillTodayColor,
  fillHolidayColor,
  isShowWeekDays,
  holidays,
  startOfWeek = WeekStart.Monday,
}: IMonth) => {
  const renderDays = () => {
    return days.map((day, index) => {
      const isDisabled = day.getMonth() === currentDate.getMonth();
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
          isdisabled={isDisabled}
        >
          {day.getDate()}
        </DayButton>
      );
    });
  };
  return (
    <>
      <Weekdays startOfWeek={startOfWeek} />
      <DaysGrid>{renderDays()}</DaysGrid>
    </>
  );
};

export default memo(MonthGrid);
