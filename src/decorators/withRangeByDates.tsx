import { DateInputProps } from '@components/DateInput/DateInput';
import React from 'react';

interface WithRangeDateProps {
  handleSelectDate: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  value?: Date | null;
  labelText: string;
}

const withRangeByDate = (WrappedComponent: React.FC<DateInputProps>) => {
  return ({
    minDate,
    maxDate,
    value,
    labelText,
    handleSelectDate,
  }: WithRangeDateProps) => {
    const compareDate = (
      date: Date,
      minDate: Date | null | undefined,
      maxDate: Date | null | undefined,
    ) => {
      const isInMinRange = minDate && date < minDate;
      const isInMaxRange = maxDate && date > maxDate;

      if (isInMinRange) return minDate;
      if (isInMaxRange) return maxDate;
      return date;
    };
    const handleDateChange = (date: Date | null) => {
      const selectedDate = date ? new Date(date) : null;

      if (!selectedDate) {
        return handleSelectDate(null);
      }

      const clampedDate = compareDate(selectedDate, minDate, maxDate);
      handleSelectDate(clampedDate);
    };

    return (
      <WrappedComponent
        handleSelectDate={handleDateChange}
        labelText={labelText}
        value={value}
      />
    );
  };
};

export default withRangeByDate;
