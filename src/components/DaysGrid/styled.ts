import styled from 'styled-components';
const colors = {
  weekday: '#ff0000',
  disWeekday: '#ff8c8c',
  disabled: '#AAAAAA',
  lightColor: '#fff',
  darkColor: '#000',
};

export const DayButton = styled.button<{
  filltoday: string;
  fillholiday?: string;
}>`
  border: none;
  font-size: 14px;
  cursor: pointer;
  width: 34px;
  height: 34px;
  background-color: transparent;
  border-radius: 4px;
  position: relative;

  &.disabled {
    color: ${colors.disabled};
  }

  &.today {
    border: 0.01px solid ${({ filltoday }) => filltoday};
    box-shadow: 0 0 0.1rem ${({ filltoday }) => filltoday};
  }
  &.today.disabled {
    border: 0.01px solid ${colors.disabled};
    box-shadow: 0 0 0.1rem ${colors.disabled};
  }

  &.weekday {
    color: ${colors.weekday};
  }
  &.weekday.disabled {
    color: ${colors.disWeekday};
  }

  &.holiday {
    color: ${({ fillholiday }) => fillholiday};
    text-decoration-line: underline;
  }

  &.selected {
    background-color: ${({ filltoday }) => filltoday};
    color: ${colors.lightColor};
    border-radius: 4px;
    transition: all 0.3s;
  }

  &.selected.disabled {
    background-color: #ececec;
    color: ${colors.lightColor};
  }

  &.in-range {
    border-radius: 0;
    background-color: #2f80ed1a;
    color: ${({ filltoday }) => filltoday};
  }
  &.start-range {
    border-radius: 4px 0 0 4px;
    background-color: #2f80ed99;
    color: ${colors.lightColor};
  }
  &.end-range {
    border-radius: 0 4px 4px 0;
    background-color: ${({ filltoday }) => filltoday};
    color: ${colors.lightColor};
  }

  &:hover {
    background-color: #f1f1f1;
    color: ${colors.darkColor};
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
`;
