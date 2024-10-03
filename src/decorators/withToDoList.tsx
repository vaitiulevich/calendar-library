import { CalendarProps } from '@components/Calendar/Calendar';
import TaskPanel from '@components/TaskPanel/TaskPanel';
import { useToDoContext } from '@store/ToDoContext';
import React, { useCallback } from 'react';

const withToDoList = (WrappedComponent: React.ComponentType<CalendarProps>) => {
  return (props: CalendarProps) => {
    const {
      handleDayClick,
      selectedDay,
      tasks,
      handleAddTask,
      handleRemoveTask,
    } = useToDoContext();
    const onClosePanel = useCallback(() => {
      if (selectedDay) {
        handleDayClick(selectedDay);
      } else {
        handleDayClick(new Date());
      }
    }, [selectedDay]);
    return (
      <>
        <WrappedComponent
          {...props}
          handleDayClick={handleDayClick}
          selectedDay={selectedDay}
          tasks={tasks}
        />
        {selectedDay && (
          <TaskPanel
            date={selectedDay}
            tasks={tasks[selectedDay ? selectedDay?.toDateString() : 0] || []}
            onAddTask={handleAddTask}
            onRemoveTask={handleRemoveTask}
            onClose={onClosePanel}
          />
        )}
      </>
    );
  };
};

export default withToDoList;
