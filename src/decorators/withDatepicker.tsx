import React, { useCallback } from 'react';
import { CalendarProps } from '@components/Calendar/Calendar';
import DateInput from '@components/DateInput/DateInput';
import withYearRange from '@decorators/withYearRange';
import { useCalendarContext } from '@store/CalendarContext';

const EnhancedDateInput = withYearRange(DateInput);
const withDatepicker = (
  WrappedComponent: React.ComponentType<CalendarProps>,
) => {
  const WithDatepicker = (props: CalendarProps) => {
    const {
      handleSetMonth,
      handleSetYear,
      today,
      selectedDay,
      handleDayClick,
    } = useCalendarContext();

    const handleSelectDate = useCallback((date: Date | null) => {
      const day = date || today;
      handleSetMonth(day.getMonth());
      handleSetYear(day.getFullYear());
      handleDayClick(date);
    }, []);

    return (
      <>
        <EnhancedDateInput
          handleSelectDate={handleSelectDate}
          rangeYears={props.rangeYears}
          value={selectedDay}
          labelText="Date"
        />
        <WrappedComponent
          handleDayClick={handleSelectDate}
          selectedDay={selectedDay}
          {...props}
        />
      </>
    );
  };

  return WithDatepicker;
};

export default withDatepicker;
