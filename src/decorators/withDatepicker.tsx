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
    const {
      currentDate,
      handleSetMonth,
      handleSetYear,
      today,
      selectedDay,
      handleDayClick,
    } = useCalendarContext();

    const handleSelectDate = useCallback(
      (date: Date | null) => {
        const day = date ?? today;
        handleSetMonth(day.getMonth());
        handleSetYear(day.getFullYear());
        handleDayClick(day);
      },
      [currentDate],
    );

    return (
      <>
        <EnhancedDateInput
          handleSelectDate={handleSelectDate}
          rangeYears={props.rangeYears}
        />
        <WrappedComponent selectedDay={selectedDay} {...props} />
      </>
    );
  };

  return WithDatepicker;
};

export default withDatepicker;
