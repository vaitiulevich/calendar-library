import React from 'react';
import { CalendarWrapper } from './styled';
import { CalendarTypes, WeekStart } from '@services/CalendarEnums';
import { defMaxDate, defMinDate, defRange } from '@constants/constants';
import CalendarMonth from '@components/CalendarMonth/CalendarMonth';
import CalendarWeek from '@components/CalendarWeek/CalendarWeek';
import CalendarYaer from '@components/CalendarYaer/CalendarYaer';

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
  minDate?: number;
  maxDate?: number;
  isShowWeekDays?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  holidays?: IHoliday[];
  handleDayClick?: (day: Date) => void;
  selectedDay?: Date | null;
  tasks?: { [key: string]: string[] };
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
  handleDayClick,
  selectedDay,
  tasks,
  onClick,
  label,
}: CalendarProps) => {
  const renderCalendarType = () => {
    switch (type) {
      case CalendarTypes.Month:
        return (
          <CalendarMonth
            minDate={minDate}
            maxDate={maxDate}
            startOfWeek={startOfWeek}
            isShowWeekDays={isShowWeekDays}
            fillHolidayColor={fillHolidayColor}
            fillTodayColor={fillTodayColor}
            holidays={holidays}
            rangeYears={rangeYears}
            handleDayClick={handleDayClick}
            selectedDay={selectedDay}
            tasks={tasks}
          />
        );
      case CalendarTypes.Week:
        return (
          <CalendarWeek
            minDate={minDate}
            maxDate={maxDate}
            startOfWeek={startOfWeek}
            isShowWeekDays={isShowWeekDays}
            fillHolidayColor={fillHolidayColor}
            fillTodayColor={fillTodayColor}
            holidays={holidays}
            rangeYears={rangeYears}
          />
        );
      case CalendarTypes.Yaer:
        return (
          <CalendarYaer
            minDate={minDate}
            maxDate={maxDate}
            startOfWeek={startOfWeek}
            isShowWeekDays={isShowWeekDays}
            fillHolidayColor={fillHolidayColor}
            fillTodayColor={fillTodayColor}
            holidays={holidays}
            rangeYears={rangeYears}
          />
        );
    }
  };

  return <CalendarWrapper>{renderCalendarType()}</CalendarWrapper>;
};

export default Calendar;
