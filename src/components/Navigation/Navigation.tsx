import { memo } from 'react';
import { MonthHeader, NavigationWrapper } from './styled';
import arrPrev from '@icons/Prev.svg';
import arrNext from '@icons/Next.svg';
import React from 'react';

const Navigation = ({
  currentDate,
  onPrev,
  onNext,
}: {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
}) => {
  return (
    <NavigationWrapper>
      <button onClick={onPrev}>
        <img src={arrPrev} alt="prev" />
      </button>
      <MonthHeader>
        {currentDate.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </MonthHeader>
      <button onClick={onNext}>
        <img src={arrNext} alt="next" />
      </button>
    </NavigationWrapper>
  );
};

export default memo(Navigation);
