import React, { useCallback } from 'react';
import { CalendarProps } from '@components/Calendar/Calendar';
import TaskPanel from '@components/TaskPanel/TaskPanel';
import { useCalendarContext } from '@store/CalendarContext';
import { useToDoContext } from '@store/ToDoContext';

const withToDoList = (WrappedComponent: React.ComponentType<CalendarProps>) => {
  return (props: CalendarProps) => {
    const { tasks, handleAddTask, handleRemoveTask } = useToDoContext();
    const { handleDayClick, selectedDay } = useCalendarContext();
    const onClosePanel = useCallback(() => {
      handleDayClick(null);
    }, [selectedDay]);
    const tasksList =
      tasks[selectedDay ? selectedDay?.toDateString() : 0] || [];
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
            tasks={tasksList}
            handleAddTask={handleAddTask}
            handleRemoveTask={handleRemoveTask}
            onClose={onClosePanel}
          />
        )}
      </>
    );
  };
};

export default withToDoList;
