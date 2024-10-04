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
      handleDayClick(selectedDay || new Date());
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
