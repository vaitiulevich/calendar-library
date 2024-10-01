import { memo, useEffect } from 'react';
import React from 'react';
import { DayButton, DaysGridContainer } from './styled';
import { IHoliday } from '@components/Calendar/Calendar';
import Weekdays from '@components/Weekdays/Weekdays';
import { WeekStart } from '@services/CalendarEnums';
import { isHoliday, isWeekday } from '@utils/CalendarDayTypes';
import { defMaxDate, defMinDate } from '@constants/constants';

interface IDays {
  days: Date[];
  currentDate: Date;
  today: Date;
  minDate?: number;
  maxDate?: number;
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
    minDate?: number,
    maxDate?: number,
    rangeYears?: [number, number],
  ): Date[];
}

const DaysGrid = ({
  days,
  currentDate,
  today,
  minDate = defMinDate,
  maxDate = defMaxDate,
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
        day.getTime() < minDate ||
        day.getTime() > maxDate;
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
