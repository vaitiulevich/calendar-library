import React from 'react';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import withDatepicker from '@decorators/withDatepicker';
import withDateRangePicker from '@decorators/withDateRange/withDateRangePicker';
import withToDoList from '@decorators/withToDoList';
import { CalendarProvider } from '@store/CalendarContext';
import { ToDoListProvider } from '@store/ToDoContext';

import { CalendarProps } from '../../src/components/Calendar/Calendar';

export interface DynamicViewsProps extends CalendarProps {
  isToDoList?: boolean;
  isDateRangePicker?: boolean;
  isDatepicker?: boolean;
}

const withCalendarViews = (
  WrappedComponent: React.ComponentType<DynamicViewsProps>,
) => {
  return (props: DynamicViewsProps) => {
    const { isToDoList, isDateRangePicker, isDatepicker, rangeYears } = props;
    let EnhancedComponent = WrappedComponent;

    if (isToDoList) {
      EnhancedComponent = withToDoList(WrappedComponent);
    }

    if (isDateRangePicker) {
      EnhancedComponent = withDateRangePicker(EnhancedComponent);
    }

    if (isDatepicker) {
      EnhancedComponent = withDatepicker(EnhancedComponent);
    }

    const ComponentWithProviders = (
      <ErrorBoundary>
        <CalendarProvider initialDate={new Date()} rangeYears={rangeYears}>
          <ToDoListProvider>
            <EnhancedComponent {...props} />
          </ToDoListProvider>
        </CalendarProvider>
      </ErrorBoundary>
    );

    return ComponentWithProviders;
  };
};

export default withCalendarViews;
