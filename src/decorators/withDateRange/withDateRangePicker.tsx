import React, { useState } from 'react';
import { CalendarProps } from '@components/Calendar/Calendar';
import DateInput from '@components/DateInput/DateInput';

import withRangeByDate from '../withRangeByDates';
import { ClearButton, RangeCalendatContainer } from './styled';

const EnhancedDateInput = withRangeByDate(DateInput);

const withDateRangePicker = (
  WrappedComponent: React.ComponentType<CalendarProps>,
) => {
  return (props: CalendarProps) => {
    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>();

    const handleStartDateChange = (date: Date | null) => {
      if (date && endDate && date > endDate) {
        setEndDate((prev) => {
          setStartDate(prev);
          return date;
        });
      } else {
        setStartDate(date);
      }
    };

    const handleEndDateChange = (date: Date | null) => {
      if (date && startDate && date < startDate) {
        setStartDate((prev) => {
          setEndDate(prev);
          return date;
        });
      } else {
        setEndDate(date);
      }
    };

    const isInRange = (date: string) => {
      if (!startDate || !endDate) return false;
      const current = new Date(date);
      return current >= startDate && current <= endDate;
    };

    const onClearRange = () => {
      setStartDate(null);
      setEndDate(null);
    };

    const renderDateInput = (
      labelText: string,
      date: Date | null | undefined,
      handleChange: (date: Date | null) => void,
    ) => (
      <EnhancedDateInput
        labelText={labelText}
        value={date}
        maxDate={props.maxDate ? new Date(props.maxDate) : undefined}
        minDate={props.minDate ? new Date(props.minDate) : undefined}
        handleSelectDate={handleChange}
      />
    );

    const handleDayClick = (date: Date | null) => {
      if (!date) return;
      startDate ? handleEndDateChange(date) : handleStartDateChange(date);
    };

    const isHasRange = startDate || endDate;
    return (
      <RangeCalendatContainer>
        <div>
          {renderDateInput('From:', startDate, handleStartDateChange)}
          {renderDateInput('To:', endDate, handleEndDateChange)}
        </div>
        <WrappedComponent
          {...props}
          handleDayClick={handleDayClick}
          isInRange={isInRange}
          {...(startDate ? { startDate } : {})}
          {...(endDate ? { endDate } : {})}
        />
        {isHasRange && <ClearButton onClick={onClearRange}>Clear</ClearButton>}
      </RangeCalendatContainer>
    );
  };
};

export default withDateRangePicker;
