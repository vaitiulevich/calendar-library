import styled from 'styled-components';
const colors = {
  disabledToday: '#fff',
  disabledWeekday: '#ff0000',
  disabledDefault: '#333',
  enabled: '#AAAAAA',
};

const getColor = ({
  ismonthday,
  istoday,
  isweekday,
}: {
  ismonthday: boolean;
  istoday: boolean;
  isweekday: boolean;
}) => {
  if (ismonthday) {
    if (istoday) {
      return colors.disabledToday;
    }
    return isweekday ? colors.disabledWeekday : colors.disabledDefault;
  }

  return colors.enabled;
};

export const DayButton = styled.button<{
  istoday: boolean;
  isselected?: boolean;
  ismonthday: boolean;
  filltoday: string;
  fillholiday?: string;
  isweekday: boolean;
  isholiday?: boolean;
}>`
  border: none;
  background: ${({ istoday, filltoday }) => (istoday ? filltoday : 'none')};
  color: ${({ ismonthday, istoday, isweekday }) =>
    getColor({ ismonthday, istoday, isweekday })};
  font-size: 14px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin: 2px;
  border-radius: 4px;
  position: relative;

  ${({ isholiday, fillholiday }) =>
    isholiday &&
    `
    border: 2px solid ${fillholiday};
  `}

  ${({ isselected, filltoday }) =>
    isselected &&
    `
    border: 0.01px solid ${filltoday};
    box-shadow: 0 0 0.1rem ${filltoday};
  `}

  &:disabled {
    color: ${colors.enabled};
    background: ${({ istoday, filltoday }) => (istoday ? '#eaeaea' : 'none')};
  }

  &:hover {
    background-color: ${({ istoday }) => (istoday ? '#0056b3' : '#f1f1f1')};
  }
`;

export const TaskIndicator = styled.div<{
  filltoday: string;
}>`
  width: 4px;
  height: 4px;
  background-color: ${({ filltoday }) => (filltoday ? filltoday : '#007bff')};
  border-radius: 50%;
  position: absolute;
  right: 0px;
  top: 3px;
  transform: translateX(-50%);
`;

export const DaysGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;
