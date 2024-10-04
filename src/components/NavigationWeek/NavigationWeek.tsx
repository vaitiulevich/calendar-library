import React, { memo } from 'react';
import { NavigationButton, NavigationWeeks } from './styled';
import { images } from '@constants/images';
import {
  DAYS_IN_A_WEEK,
  FIRST_MONTH_INDEX,
  INITIAL_WEEK_OFFSET,
  LAST_MONTH_INDEX,
  MAX_DAYS_IN_A_MONTH,
} from '@constants/constants';

interface NavigationYearsProps {
  currentDate: Date;
  rangeYears: [number, number];
  handleSetMonth: (month: number) => void;
  handleSetWeek: (week: number) => void;
  weekOffset: number;
  weeks: Date[][];
}
const NavigationWeek = ({
  currentDate,
  rangeYears,
  handleSetMonth,
  handleSetWeek,
  weekOffset,
  weeks,
}: NavigationYearsProps) => {
  const handleNextWeek = () => {
    if (weekOffset + 1 >= weeks.length) {
      handleSetWeek(INITIAL_WEEK_OFFSET);
      handleSetMonth(currentDate.getMonth() + 1);
    } else {
      handleSetWeek(weekOffset + 1);
    }
  };

  const getWeeks = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    return (
      Math.ceil((MAX_DAYS_IN_A_MONTH - date.getDate()) / DAYS_IN_A_WEEK) - 1
    );
  };

  const handlePrevWeek = () => {
    if (weekOffset === INITIAL_WEEK_OFFSET) {
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

  const isFirstMonth = month === FIRST_MONTH_INDEX;
  const isLastMonth = month === LAST_MONTH_INDEX;

  const isPrevWeekDisabled =
    year === rangeYears[0] &&
    isFirstMonth &&
    weekOffset === INITIAL_WEEK_OFFSET;
  const isNextWeekDisabled =
    weekOffset + 1 >= weeks.length && year === rangeYears[1] && isLastMonth;

  const currentMonthTitle = currentDate.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
  const currentWeek = weekOffset + 1;

  return (
    <NavigationWeeks>
      <NavigationButton disabled={isPrevWeekDisabled} onClick={handlePrevWeek}>
        <img src={images.prevMonth} alt="prev" />
      </NavigationButton>
      <div>{`(${currentWeek} week) ${currentMonthTitle}`}</div>
      <NavigationButton disabled={isNextWeekDisabled} onClick={handleNextWeek}>
        <img src={images.nextMonth} alt="next" />
      </NavigationButton>
    </NavigationWeeks>
  );
};

export default memo(NavigationWeek);
