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
    const handleDateChange = (date: Date | null) => {
      if (!date) {
        return handleSelectDate(null);
      }

      const newDate = new Date(date);
      if (!minDate || !maxDate) {
        return handleSelectDate(newDate);
      }
      if (newDate < minDate) {
        handleSelectDate(minDate);
      } else if (newDate > maxDate) {
        handleSelectDate(maxDate);
      } else {
        return handleSelectDate(newDate);
      }
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
