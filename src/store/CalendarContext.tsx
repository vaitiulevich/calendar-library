import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
} from 'react';

interface CalendarContextType {
  currentDate: Date;
  handleSetMonth: (selectMonth: number) => void;
  handleSetYear: (selectYear: number) => void;
  today: Date;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined,
);

interface CalendarProviderProps {
  initialDate: Date;
  children: ReactNode;
}
export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
  initialDate,
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const today = new Date();

  const handleSetMonth = useCallback((selectMonth: number) => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), selectMonth, 1),
    );
  }, []);

  const handleSetYear = useCallback((selectYear: number) => {
    setCurrentDate((prevDate) => new Date(selectYear, prevDate.getMonth(), 1));
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        handleSetMonth,
        handleSetYear,
        today,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = (): CalendarContextType => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'useCalendarContext must be used within a CalendarProvider',
    );
  }
  return context;
};
