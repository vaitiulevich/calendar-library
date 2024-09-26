import styled from 'styled-components';

const getColor = ({
  isdisabled,
  istoday,
  isweekday,
}: {
  isdisabled: boolean;
  istoday: boolean;
  isweekday: boolean;
}) => {
  const colors = {
    disabledToday: '#fff',
    disabledWeekday: '#ff0000',
    disabledDefault: '#333',
    enabled: '#AAAAAA',
  };

  if (isdisabled) {
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
  isdisabled: boolean;
  filltoday?: string;
  fillholiday?: string;
  isweekday: boolean;
  isholiday?: boolean;
}>`
  border: none;
  background: ${({ istoday, filltoday }) => (istoday ? filltoday : 'none')};
  color: ${({ isdisabled, istoday, isweekday }) =>
    getColor({ isdisabled, istoday, isweekday })};
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

  &:hover {
    background-color: ${({ istoday }) => (istoday ? '#0056b3' : '#f1f1f1')};
  }
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;
