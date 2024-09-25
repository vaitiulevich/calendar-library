import styled from 'styled-components';

export const YearsGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); // 5 лет в строке
  gap: 10px; // Отступ между кнопками
  padding: 10px;
`;

export const YearButton = styled.button<{ istoday?: boolean }>`
  background-color: ${({ istoday }) => (istoday ? '#007bff' : 'none')};
  color: ${({ istoday }) => (istoday ? '#fff' : '#000')};
  border: 0.1rem solid transparent;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #78aee7;
  }

  &:focus {
    outline: none;
    border: 0.1rem solid #007bff;
  }
`;
