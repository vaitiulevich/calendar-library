import React from 'react';
import { DateInputProps } from '@components/DateInput/DateInput';
import { defRange } from '@constants/constants';

interface WithYearRangeProps {
  rangeYears: [number, number];
  handleSelectDate: (date: Date | null) => void;
  labelText?: string;
  value?: Date | null;
}

const withYearRange = (WrappedComponent: React.FC<DateInputProps>) => {
  return ({
    rangeYears = defRange,
    labelText,
    value,
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
        value={value}
        validateYear={validateYear}
      />
    );
  };
};

export default withYearRange;
