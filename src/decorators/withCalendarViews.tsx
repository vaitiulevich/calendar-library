import React from 'react';
import { CalendarProvider } from '@store/CalendarContext';
import { ToDoListProvider } from '@store/ToDoContext';
import withToDoList from '@decorators/withToDoList';
import withDatepicker from '@decorators/withDatepicker';
import withDateRangePicker from '@decorators/withDateRange/withDateRangePicker';
import { CalendarProps } from '@components/Calendar/Calendar';

interface DynamicViewsProps extends CalendarProps {
  isToDoList?: boolean;
  isDateRangePicker?: boolean;
  isDatepicker?: boolean;
}

const withCalendarViews = (
  WrappedComponent: React.ComponentType<DynamicViewsProps>,
) => {
  return (props: DynamicViewsProps) => {
    const { isToDoList, isDateRangePicker, isDatepicker } = props;
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
      <CalendarProvider initialDate={new Date()}>
        <ToDoListProvider>
          <EnhancedComponent {...props} />
        </ToDoListProvider>
      </CalendarProvider>
    );

    return ComponentWithProviders;
  };
};

export default withCalendarViews;
