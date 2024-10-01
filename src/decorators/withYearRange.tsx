import { DateInputProps } from '@components/DateInput/DateInput';
import { defRange } from '@constants/constants';
import React from 'react';

interface WithYearRangeProps {
  rangeYears: [number, number];
  value: string;
  handleSelectDate: (date: Date) => void;
}

const withYearRange = (WrappedComponent: React.FC<DateInputProps>) => {
  return ({ rangeYears = defRange, ...props }: WithYearRangeProps) => {
    const validateYear = (year: string) => {
      const yearNum = parseInt(year);
      if (yearNum < rangeYears[0]) return `${rangeYears[0]}`;
      if (yearNum > rangeYears[1]) return `${rangeYears[1]}`;
      return year;
    };

    return <WrappedComponent {...props} validateYear={validateYear} />;
  };
};

export default withYearRange;
