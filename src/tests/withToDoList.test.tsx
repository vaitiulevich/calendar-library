import { CalendarProps } from '@components/Calendar/Calendar';
import { defRange } from '@constants/constants';
import withToDoList from '@decorators/withToDoList';
import { useCalendarContext } from '@store/CalendarContext';
import { useToDoContext } from '@store/ToDoContext';
import { render } from '@testing-library/react';

jest.mock('@store/ToDoContext', () => ({
  useToDoContext: jest.fn(),
}));

jest.mock('@store/CalendarContext', () => ({
  useCalendarContext: jest.fn(),
}));

const MockComponent = (props: CalendarProps) => (
  <div data-testid="mock-component" {...props} />
);
const EnhancedComponent = withToDoList(MockComponent);

describe('withToDoList HOC', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders wrapped component without task panel when no day is selected', () => {
    (useToDoContext as jest.Mock).mockReturnValue({
      tasks: {},
      handleAddTask: jest.fn(),
      handleRemoveTask: jest.fn(),
    });

    (useCalendarContext as jest.Mock).mockReturnValue({
      handleDayClick: jest.fn(),
      selectedDay: null,
    });

    const { getByTestId } = render(<EnhancedComponent rangeYears={defRange} />);

    expect(getByTestId('mock-component')).toBeInTheDocument();
  });

  test('renders task panel when a day is selected', () => {
    const tasks = {
      '2024-10-05': [{ id: 1, title: 'Task 1' }],
    };

    (useToDoContext as jest.Mock).mockReturnValue({
      tasks,
      handleAddTask: jest.fn(),
      handleRemoveTask: jest.fn(),
    });

    (useCalendarContext as jest.Mock).mockReturnValue({
      handleDayClick: jest.fn(),
      selectedDay: new Date(2024, 9, 5),
    });

    const { getByTestId } = render(<EnhancedComponent rangeYears={defRange} />);

    expect(getByTestId('mock-component')).toBeInTheDocument();
  });
});
