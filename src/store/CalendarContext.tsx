import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface CalendarContextType {
  currentDate: Date;
  handleSetMonth: (selectMonth: number) => void;
  handleSetYear: (selectYear: number) => void;
  today: Date;
  handleDayClick: (day: Date | null) => void;
  selectedDay: Date | null;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined,
);

interface CalendarProviderProps {
  initialDate?: Date;
  rangeYears?: [number, number];
  children: ReactNode;
}
export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
  initialDate,
  rangeYears,
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate ?? new Date());

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  useEffect(() => {
    if (selectedDay) {
      setCurrentDate(selectedDay);
    }
  }, [selectedDay]);

  useEffect(() => {
    if (
      rangeYears &&
      (currentDate.getFullYear() < rangeYears[0] ||
        currentDate.getFullYear() > rangeYears[1])
    ) {
      handleSetYear(rangeYears[0]);
    }
  }, [rangeYears]);

  const handleDayClick = useCallback((day: Date | null) => {
    setSelectedDay(day);
  }, []);
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
        handleDayClick,
        selectedDay,
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
