import { memo, useState } from 'react';
import { MonthHeader, NavigationButton, NavigationWrapper } from './styled';
import React from 'react';
import { images } from '@constants/images';

const Navigation = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
  rangeYears,
}: {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPrevYear: () => void;
  onNextYear: () => void;
  rangeYears: [number, number];
}) => {
  return (
    <NavigationWrapper>
      <NavigationButton
        disabled={currentDate.getFullYear() - 1 !== rangeYears[0]}
        onClick={onPrevYear}
      >
        <img src={images.prevYear} alt="prev year" />
      </NavigationButton>
      <NavigationButton
        onClick={onPrevMonth}
        disabled={
          currentDate.getFullYear() === rangeYears[0] &&
          currentDate.getMonth() === 0
        }
      >
        <img src={images.prevMonth} alt="prev" />
      </NavigationButton>
      <MonthHeader>
        {currentDate.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </MonthHeader>

      <NavigationButton
        onClick={onNextMonth}
        disabled={
          currentDate.getFullYear() === rangeYears[1] &&
          currentDate.getMonth() === 11
        }
      >
        <img src={images.nextMonth} alt="next" />
      </NavigationButton>
      <NavigationButton
        disabled={currentDate.getFullYear() + 1 !== rangeYears[1]}
        onClick={onNextYear}
      >
        <img src={images.nextYear} alt="next year" />
      </NavigationButton>
    </NavigationWrapper>
  );
};

export default memo(Navigation);
