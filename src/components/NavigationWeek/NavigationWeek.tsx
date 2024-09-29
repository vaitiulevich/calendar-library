import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationButton, NavigationWeek } from './styled';
import { images } from '@constants/images';
import { useCalendar } from '@utils/useCalendar';
import { WeekStart } from '@services/CalendarEnums';

interface NavigationYearsProps {
  currentDate: Date;
  rangeYears: [number, number];
  handleSetMonth: (month: number) => void;
  handleSetWeek: (week: number) => void;
  weekOffset: number;
  weeks: Date[][];
}

const NavigationWeeks: React.FC<NavigationYearsProps> = ({
  currentDate,
  rangeYears,
  handleSetMonth,
  handleSetWeek,
  weekOffset,
  weeks,
}) => {
  const nextWeek = () => {
    if (weekOffset + 1 >= weeks.length) {
      handleSetWeek(0);
      handleSetMonth(currentDate.getMonth() + 1);
    } else {
      handleSetWeek(weekOffset + 1);
    }
  };
  const getWeeks = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    console.log(32 - date.getDate());
    return Math.ceil((32 - date.getDate()) / 7) - 1;
  };

  const prevWeek = () => {
    if (weekOffset === 0) {
      const res = getWeeks(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
      );
      handleSetWeek(res);
      handleSetMonth(currentDate.getMonth() - 1);
    } else {
      handleSetWeek(weekOffset - 1);
    }
  };

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const isFirstMonth = month === 0;
  const isLastMonth = month === 11;

  const isPrevWeekDisabled =
    year === rangeYears[0] && isFirstMonth && weekOffset === 0;
  const isNextWeekDisabled =
    weekOffset + 1 >= weeks.length && year === rangeYears[1] && isLastMonth;

  const currentMonthTitle = currentDate.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <NavigationWeek>
      <NavigationButton disabled={isPrevWeekDisabled} onClick={prevWeek}>
        <img src={images.prevMonth} alt="prev" />
      </NavigationButton>
      <div>{`(${weekOffset + 1} week) ${currentMonthTitle}`}</div>
      <NavigationButton disabled={isNextWeekDisabled} onClick={nextWeek}>
        <img src={images.nextMonth} alt="next" />
      </NavigationButton>
    </NavigationWeek>
  );
};

export default memo(NavigationWeeks);
