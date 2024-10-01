import styled from 'styled-components';
const colors = {
  disabledToday: '#fff',
  disabledWeekday: '#ff0000',
  disabledDefault: '#333',
  enabled: '#AAAAAA',
};

const getColor = ({
  ismothday,
  istoday,
  isweekday,
}: {
  ismothday: boolean;
  istoday: boolean;
  isweekday: boolean;
}) => {
  if (ismothday) {
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
  ismothday: boolean;
  filltoday?: string;
  fillholiday?: string;
  isweekday: boolean;
  isholiday?: boolean;
}>`
  border: none;
  background: ${({ istoday, filltoday }) => (istoday ? filltoday : 'none')};
  color: ${({ ismothday, istoday, isweekday }) =>
    getColor({ ismothday, istoday, isweekday })};
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

  &:disabled {
    color: ${colors.enabled};
    background: ${({ istoday, filltoday }) => (istoday ? '#eaeaea' : 'none')};
  }

  &:hover {
    background-color: ${({ istoday }) => (istoday ? '#0056b3' : '#f1f1f1')};
  }
`;

export const DaysGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;
