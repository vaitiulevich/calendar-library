import styled from 'styled-components';

export const DayButton = styled.button<{
  istoday?: boolean;
  isselected?: boolean;
  isdisabled?: boolean;
}>`
  border: none;
  background: ${({ istoday }) => (istoday ? '#007bff' : 'none')};
  color: ${({ isdisabled, istoday }) =>
    isdisabled ? (istoday ? '#fff' : '#333') : '#AAAAAA'};
  font-size: 14px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin: 2px;
  border-radius: 4px;
  position: relative;

  /* ${({ istoday }) =>
    istoday &&
    `
    border: 2px solid #007bff;
  `} */

  &:hover {
    background-color: ${({ istoday }) => (istoday ? '#0056b3' : '#f1f1f1')};
  }
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;
