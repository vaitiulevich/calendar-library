import { memo, useState } from 'react';
import { MonthHeader, NavigationButton, NavigationWrapper } from './styled';
import React from 'react';
import { images } from '@constants/images';

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
  return (
    <NavigationWrapper>
      <NavigationButton
        disabled={currentDate.getFullYear() - 1 !== rangeYears[0]}
        onClick={() => onSetYear(currentDate.getFullYear() - 1)}
      >
        <img src={images.prevYear} alt="prev year" />
      </NavigationButton>
      <NavigationButton
        onClick={() => onSetMonth(currentDate.getMonth() - 1)}
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
        onClick={() => onSetMonth(currentDate.getMonth() + 1)}
        disabled={
          currentDate.getFullYear() === rangeYears[1] &&
          currentDate.getMonth() === 11
        }
      >
        <img src={images.nextMonth} alt="next" />
      </NavigationButton>
      <NavigationButton
        disabled={currentDate.getFullYear() + 1 !== rangeYears[1]}
        onClick={() => onSetYear(currentDate.getFullYear() + 1)}
      >
        <img src={images.nextYear} alt="next year" />
      </NavigationButton>
    </NavigationWrapper>
  );
};

export default memo(Navigation);
