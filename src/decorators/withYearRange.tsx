import { DateInputProps } from '@components/DateInput/DateInput';
import { defRange } from '@constants/constants';
import React from 'react';

interface WithYearRangeProps {
  rangeYears: [number, number];
  handleSelectDate: (date: Date | null) => void;
  labelText?: string;
}

const withYearRange = (WrappedComponent: React.FC<DateInputProps>) => {
  return ({
    rangeYears = defRange,
    labelText,
    ...props
  }: WithYearRangeProps) => {
    const validateYear = (year: string) => {
      const yearNum = parseInt(year);
      if (yearNum < rangeYears[0]) return `${rangeYears[0]}`;
      if (yearNum > rangeYears[1]) return `${rangeYears[1]}`;
      return year;
    };

    return (
      <WrappedComponent
        {...props}
        labelText={labelText}
        validateYear={validateYear}
      />
    );
  };
};

export default withYearRange;
