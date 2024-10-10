import { memo } from 'react';
import React from 'react';
import { images } from '@constants/images';

import { MonthHeader, NavigationButton, NavigationWrapper } from './styled';

const Navigation = ({
  currentDate,
  onSetMonth,
  onSetYear,
  rangeYears,
}: {
  currentDate: Date;
  onSetMonth: (month: number) => void;
  onSetYear: (year: number) => void;
  rangeYears: [number, number];
}) => {
  const currentMonthTitle = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const isFirstMonth = month === 0;
  const isLastMonth = month === 11;

  const isPrevMonthDisabled = year === rangeYears[0] && isFirstMonth;
  const isNextMonthDisabled = year === rangeYears[1] && isLastMonth;
  const isPrevYearDisabled = year - 1 < rangeYears[0];
  const isNextYearDisabled = year + 1 > rangeYears[1];

  const handlePrevMonth = () => onSetMonth(currentDate.getMonth() - 1);
  const handleNextMonth = () => onSetMonth(currentDate.getMonth() + 1);

  const handlePrevYear = () => onSetYear(currentDate.getFullYear() - 1);
  const handleNextYear = () => onSetYear(currentDate.getFullYear() + 1);

  return (
    <NavigationWrapper>
      <NavigationButton
        data-cy="prev-year-button"
        disabled={isPrevYearDisabled}
        onClick={handlePrevYear}
      >
        <img src={images.prevYear} alt="prev year" />
      </NavigationButton>
      <NavigationButton
        data-cy="prev-month-button"
        onClick={handlePrevMonth}
        disabled={isPrevMonthDisabled}
      >
        <img src={images.prevMonth} alt="prev" />
      </NavigationButton>

      <MonthHeader>{currentMonthTitle}</MonthHeader>

      <NavigationButton
        onClick={handleNextMonth}
        disabled={isNextMonthDisabled}
        data-cy="next-month-button"
      >
        <img src={images.nextMonth} alt="next" />
      </NavigationButton>
      <NavigationButton
        data-cy="next-year-button"
        disabled={isNextYearDisabled}
        onClick={handleNextYear}
      >
        <img src={images.nextYear} alt="next year" />
      </NavigationButton>
    </NavigationWrapper>
  );
};

export default memo(Navigation);
