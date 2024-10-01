import React, { useCallback } from 'react';
import { useCalendarContext } from '@store/CalendarContext';
import DateInput from '@components/DateInput/DateInput';
import withYearRange from '@decorators/withYearRange';
import { CalendarProps } from '@components/Calendar/Calendar';

const EnhancedDateInput = withYearRange(DateInput);
const withDatepicker = (
  WrappedComponent: React.ComponentType<CalendarProps>,
) => {
  const WithDatepicker = (props: CalendarProps) => {
    const { currentDate, handleSetMonth, handleSetYear } = useCalendarContext();

    const handleSelectDate = useCallback(
      (date: Date) => {
        handleSetMonth(date.getMonth());
        handleSetYear(date.getFullYear());
      },
      [currentDate],
    );

    return (
      <>
        <EnhancedDateInput
          value={''}
          handleSelectDate={handleSelectDate}
          rangeYears={props.rangeYears}
        />
        <WrappedComponent {...props} />
      </>
    );
  };

  return WithDatepicker;
};

export default withDatepicker;
