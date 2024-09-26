import React, { useMemo, useState } from 'react';
import { YearButton, YearsGridWrapper } from './styled';

interface YearsGridProps {
  today: Date;
  currentDecade: number;
  rangeYears: [number, number];
  handleSetYear: (year: number) => void;
}

const YearsGrid: React.FC<YearsGridProps> = ({
  today,
  currentDecade,
  rangeYears,
  handleSetYear,
}) => {
  const years = useMemo(() => {
    const startYear = currentDecade;
    return Array.from({ length: 10 }, (_, i) => startYear + i).filter(
      (year) => year <= rangeYears[1],
    );
  }, [currentDecade, rangeYears]);

  const renderYears = () => {
    return years.map((year) => (
      <YearButton
        istoday={today.getFullYear() === year}
        key={year}
        onClick={() => handleSetYear(year)}
      >
        {year}
      </YearButton>
    ));
  };
  return <YearsGridWrapper>{renderYears()}</YearsGridWrapper>;
};

export default YearsGrid;
