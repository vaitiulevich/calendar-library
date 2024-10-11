import React from 'react';
import TaskPanel from '@components/TaskPanel/TaskPanel';
import { Task } from '@store/ToDoContext';
import { fireEvent, render } from '@testing-library/react';

const mockTasks: Task[] = [
  { id: '1', task: 'Test task 1' },
  { id: '2', task: 'Test task 2' },
];

const mockHandleAddTask = jest.fn();
const mockHandleRemoveTask = jest.fn();
const mockOnClose = jest.fn();

test('renders TaskPanel with tasks', () => {
  const { getByText } = render(
    <TaskPanel
      date={new Date(2024, 9, 5)}
      tasks={mockTasks}
      handleAddTask={mockHandleAddTask}
      handleRemoveTask={mockHandleRemoveTask}
      onClose={mockOnClose}
    />,
  );

  expect(getByText(/tasks for/i)).toBeInTheDocument();
  expect(getByText('Test task 1')).toBeInTheDocument();
  expect(getByText('Test task 2')).toBeInTheDocument();
});

test('should add a new task when the form is submitted', () => {
  const { getByText, getByPlaceholderText } = render(
    <TaskPanel
      date={new Date(2024, 9, 5)}
      tasks={mockTasks}
      handleAddTask={mockHandleAddTask}
      handleRemoveTask={mockHandleRemoveTask}
      onClose={mockOnClose}
    />,
  );
  const input = getByPlaceholderText('Write task');
  const addButton = getByText('Add');

  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  expect(mockHandleAddTask).toHaveBeenCalledWith(
    new Date().toDateString(),
    'New Task',
  );
});

test('should not add a task if input is empty', () => {
  const { getByText } = render(
    <TaskPanel
      date={new Date(2024, 9, 5)}
      tasks={mockTasks}
      handleAddTask={mockHandleAddTask}
      handleRemoveTask={mockHandleRemoveTask}
      onClose={mockOnClose}
    />,
  );
  const addButton = getByText('Add');

  fireEvent.click(addButton);
  expect(mockHandleAddTask).not.toHaveBeenCalled();
});

test('removes a task', () => {
  const { getByTestId } = render(
    <TaskPanel
      date={new Date(2024, 9, 5)}
      tasks={mockTasks}
      handleAddTask={jest.fn()}
      handleRemoveTask={mockHandleRemoveTask}
      onClose={mockOnClose}
    />,
  );
  const deleteButton = getByTestId('delete-task-button');
  fireEvent.click(deleteButton);

  expect(mockHandleRemoveTask).toHaveBeenCalledWith('2024-10-05', '1');
});

test('closes the task panel', () => {
  const { getByText } = render(
    <TaskPanel
      date={new Date(2024, 9, 5)}
      tasks={mockTasks}
      handleAddTask={mockHandleAddTask}
      handleRemoveTask={mockHandleRemoveTask}
      onClose={mockOnClose}
    />,
  );

  fireEvent.click(getByText('Close'));

  expect(mockOnClose).toHaveBeenCalled();
});
