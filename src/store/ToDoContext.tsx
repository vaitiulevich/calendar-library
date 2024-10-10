import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { titleTaskStorage } from '@constants/constants';

interface ToDoContextType {
  // handleDayClick: (day: Date) => void;
  // selectedDay: Date | null;
  tasks: { [key: string]: Task[] };
  handleAddTask: (date: string, task: string) => void;
  handleRemoveTask: (date: string, taskId: string) => void;
}

export interface Task {
  id: string;
  task: string;
}

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

interface ToDoProviderProps {
  children: ReactNode;
}

export const ToDoListProvider: React.FC<ToDoProviderProps> = ({ children }) => {
  const getTasksFromStorage = (): { [key: string]: Task[] } => {
    try {
      const storedTasks = localStorage.getItem(titleTaskStorage);
      return storedTasks ? JSON.parse(storedTasks) : {};
    } catch (error) {
      console.error('Error parsing tasks from localStorage:', error);
      return {};
    }
  };
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>(
    getTasksFromStorage(),
  );

  const handleAddTask = useCallback((date: string, task: string) => {
    const uniqueId = Date.now().toString();
    setTasks((prevTasks: { [key: string]: Task[] }) => {
      const updatedTasks = {
        ...prevTasks,
        [date]: [...(prevTasks[date] || []), { id: uniqueId, task }],
      };
      localStorage.setItem(titleTaskStorage, JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }, []);

  const handleRemoveTask = useCallback((date: string, taskId: string) => {
    setTasks((prevTasks: { [key: string]: Task[] }) => {
      const updatedTasks = prevTasks[date].filter((task) => task.id !== taskId);
      const newTasks = { ...prevTasks };

      if (updatedTasks.length === 0) {
        delete newTasks[date];
      } else {
        newTasks[date] = updatedTasks;
      }

      localStorage.setItem(titleTaskStorage, JSON.stringify(newTasks));
      return newTasks;
    });
  }, []);

  return (
    <ToDoContext.Provider
      value={{
        tasks,
        handleAddTask,
        handleRemoveTask,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export const useToDoContext = (): ToDoContextType => {
  const context = useContext(ToDoContext);
  if (!context) {
    throw new Error('ToDoContext must be used within a ToDoListProvider');
  }
  return context;
};
