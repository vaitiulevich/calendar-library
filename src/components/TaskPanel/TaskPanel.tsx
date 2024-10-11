import React, {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  memo,
  useState,
} from 'react';
import { maxLengthTask } from '@constants/constants';
import { images } from '@constants/images';
import { Task } from '@store/ToDoContext';

import {
  AddButton,
  CloseButton,
  DeleteTaskButton,
  PanelContainer,
  TaskInput,
  TaskInputForm,
  TaskItem,
  TaskList,
  TaskTitle,
} from './styled';

interface TaskPanelProps {
  date: Date | null;
  tasks: Task[];
  handleAddTask: (date: string, task: string) => void;
  onClose: () => void;
  handleRemoveTask: (date: string, taskId: string) => void;
}

const TaskPanel: React.FC<TaskPanelProps> = ({
  date,
  tasks,
  handleAddTask,
  handleRemoveTask,
  onClose,
}) => {
  const [newTask, setNewTask] = useState('');

  const submitTask = (e: FormEvent) => {
    e.preventDefault();
    if (newTask && date) {
      handleAddTask(date.toDateString(), newTask);
      setNewTask('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitTask(e);
    }
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isEmtyValue = value.trim() !== '' || value.length === 0;
    if (isEmtyValue) {
      setNewTask(value);
    }
  };

  const renderTaskList = () => {
    return tasks.map((task) => (
      <TaskItem className="task-item" key={task.id}>
        <span>{task.task}</span>
        <DeleteTaskButton
          onClick={() => handleRemoveTask(date?.toDateString() || '', task.id)}
          data-testid="delete-task-button"
        >
          <img src={images.clearInput} alt="clear" />
        </DeleteTaskButton>
      </TaskItem>
    ));
  };

  return (
    <PanelContainer>
      <TaskTitle>Tasks for {date?.toLocaleDateString()}</TaskTitle>
      <TaskInputForm onSubmit={submitTask}>
        <TaskInput
          type="text"
          maxLength={maxLengthTask}
          value={newTask}
          onChange={onChangeInput}
          onKeyDown={handleKeyPress}
          placeholder="Write task"
        />
        <AddButton type="submit">Add</AddButton>
      </TaskInputForm>

      <TaskList>{renderTaskList()}</TaskList>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </PanelContainer>
  );
};

export default memo(TaskPanel);
