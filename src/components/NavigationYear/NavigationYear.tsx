import React from 'react';
import { DecadeHeader, NavigationButton } from './styled';
import { images } from '@constants/images';

interface NavigationYearsProps {
  currentDecade: number;
  rangeYears: [number, number];
  handleSetDecade: (stepDecade: number) => void;
}

const NavigationYears: React.FC<NavigationYearsProps> = ({
  currentDecade,
  handleSetDecade,
  rangeYears,
}) => {
  const startYear = currentDecade;
  const endYear = currentDecade + 9;

  const handlePrevDecade = () => {
    handleSetDecade(-10);
  };

  const handleNextDecade = () => {
    handleSetDecade(10);
  };

  return (
    <DecadeHeader>
      <NavigationButton
        onClick={handlePrevDecade}
        disabled={currentDecade <= rangeYears[0]}
      >
        <img src={images.prevYear} alt="prev" />
      </NavigationButton>
      {startYear} - {endYear}
      <NavigationButton
        onClick={handleNextDecade}
        disabled={endYear >= rangeYears[1]}
      >
        <img src={images.nextYear} alt="next" />
      </NavigationButton>
    </DecadeHeader>
  );
};

export default NavigationYears;
