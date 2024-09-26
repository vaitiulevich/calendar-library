import { memo } from 'react';
import React from 'react';
import { DayButton, DaysGrid } from './styled';
import { IHoliday } from '@components/Calendar/Calendar';
import Weekdays from '@components/Weekdays/Weekdays';
import { WeekStart } from '@services/CalendarEnums';

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

const MonthGrid = ({
  days,
  currentDate,
  today,
  minDate,
  maxDate,
  fillTodayColor = '#007bff',
  fillHolidayColor = '#aa6af4',
  isShowWeekDays,
  holidays,
  startOfWeek = WeekStart.Monday,
}: IMonth) => {
  console.log('currentDate', currentDate.getMonth());
  const renderDays = () => {
    return days.map((day, index) => {
      const isDisabled = !isDateWithinRange(day);
      const isHoliday =
        holidays?.some((item) => {
          const holidayDate = new Date(item.date);
          return holidayDate.toDateString() === day.toDateString();
        }) ?? false;
      const isWeekDay =
        isShowWeekDays &&
        (day.getDay() == 0 || day.getDay() == 6 ? true : false);
      return (
        <DayButton
          key={index}
          istoday={day.toDateString() === today.toDateString()}
          isweekday={isWeekDay}
          isholiday={isHoliday}
          filltoday={fillTodayColor}
          fillholiday={fillHolidayColor}
          isdisabled={day.getMonth() === currentDate.getMonth()}
          disabled={isDisabled}
        >
          {day.getDate()}
        </DayButton>
      );
    });
  };
  const isDateWithinRange = (day: Date) => {
    return (!minDate || day >= minDate) && (!maxDate || day <= maxDate);
  };

  return (
    <>
      <Weekdays startOfWeek={startOfWeek} />
      <DaysGrid>{renderDays()}</DaysGrid>
    </>
  );
};

export default memo(MonthGrid);
