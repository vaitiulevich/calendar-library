import React, { memo } from 'react';
import { DecadeHeader, NavigationButton } from './styled';
import { images } from '@constants/images';

interface NavigationYearsProps {
  currentYear: number;
  rangeYears: [number, number];
  handleSetYear: (stepDecade: number) => void;
}

const NavigationYears: React.FC<NavigationYearsProps> = ({
  currentYear,
  handleSetYear,
  rangeYears,
}) => {
  const isPrevYearDisabled = currentYear <= rangeYears[0];
  const isNextYearDisabled = currentYear >= rangeYears[1];

  const handlePrevDecade = () => {
    handleSetYear(currentYear - 1);
  };
  const handleNextDecade = () => {
    handleSetYear(currentYear + 1);
  };

  return (
    <DecadeHeader>
      <NavigationButton
        onClick={handlePrevDecade}
        disabled={isPrevYearDisabled}
      >
        <img src={images.prevYear} alt="prev" />
      </NavigationButton>
      {currentYear}
      <NavigationButton
        onClick={handleNextDecade}
        disabled={isNextYearDisabled}
      >
        <img src={images.nextYear} alt="next" />
      </NavigationButton>
    </DecadeHeader>
  );
};

export default memo(NavigationYears);
