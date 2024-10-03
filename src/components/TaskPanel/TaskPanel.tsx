import React, { memo, useState } from 'react';
import {
  AddButton,
  CloseButton,
  DeleteTaskButton,
  PanelContainer,
  TaskInput,
  TaskInputContainer,
  TaskItem,
  TaskList,
  TaskTitle,
} from './styled';
import { images } from '@constants/images';
import { maxLengthTask } from '@constants/constants';

interface TaskPanelProps {
  date: Date | null;
  tasks: string[];
  onAddTask: (date: string, task: string) => void;
  onClose: () => void;
  onRemoveTask: (date: string, taskIndex: number) => void;
}

const TaskPanel: React.FC<TaskPanelProps> = ({
  date,
  tasks,
  onAddTask,
  onRemoveTask,
  onClose,
}) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = () => {
    if (newTask && date) {
      onAddTask(date.toDateString(), newTask);
      setNewTask('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const renderTaskList = () => {
    return tasks.map((task, index) => (
      <TaskItem key={task + index}>
        <span>{task}</span>
        <DeleteTaskButton
          onClick={() => onRemoveTask(date?.toDateString() || '', index)}
        >
          <img src={images.clearInput} />
        </DeleteTaskButton>
      </TaskItem>
    ));
  };

  return (
    <PanelContainer>
      <TaskTitle>Tasks for {date?.toLocaleDateString()}</TaskTitle>
      <TaskInputContainer>
        <TaskInput
          type="text"
          maxLength={maxLengthTask}
          value={newTask}
          onChange={onChangeInput}
          onKeyDown={handleKeyDown}
          placeholder="Write task"
        />
        <AddButton onClick={handleSubmit}>Add</AddButton>
      </TaskInputContainer>

      <TaskList>{renderTaskList()}</TaskList>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </PanelContainer>
  );
};

export default memo(TaskPanel);
