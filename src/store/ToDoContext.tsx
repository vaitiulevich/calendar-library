import { titleTaskStorage } from '@constants/constants';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';

interface ToDoContextType {
  handleDayClick: (day: Date) => void;
  selectedDay: Date | null;
  tasks: { [key: string]: string[] };
  handleAddTask: (date: string, task: string) => void;
  handleRemoveTask: (date: string, taskIndex: number) => void;
}

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);
interface ToDoProviderProps {
  children: ReactNode;
}
export const ToDoListProvider: React.FC<ToDoProviderProps> = ({ children }) => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(titleTaskStorage);
    return storedTasks ? JSON.parse(storedTasks) : {};
  });

  const handleAddTask = useCallback((date: string, task: string) => {
    setTasks((prevTasks: { [key: string]: string[] }) => {
      const updatedTasks = {
        ...prevTasks,
        [date]: [...(prevTasks[date] || []), task],
      };
      localStorage.setItem(titleTaskStorage, JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }, []);

  const handleRemoveTask = useCallback((date: string, taskIndex: number) => {
    setTasks((prevTasks: { [key: string]: string[] }) => {
      const updatedTasks = prevTasks[date].filter(
        (_, index) => index !== taskIndex,
      );

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

  const handleDayClick = useCallback((day: Date) => {
    setSelectedDay((prev) => {
      if (prev === day) {
        return null;
      }
      return day;
    });
  }, []);

  return (
    <ToDoContext.Provider
      value={{
        handleDayClick,
        selectedDay,
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
    throw new Error('ToDoContext must be used within a CalendarProvider');
  }
  return context;
};
