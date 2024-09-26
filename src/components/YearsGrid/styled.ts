import styled from 'styled-components';

export const YearsGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const YearButton = styled.div<{ istoday?: boolean }>`
  font-size: 12px;
  /* background-color: ${({ istoday }) => (istoday ? '#007bff' : 'none')}; */
  color: ${({ istoday }) => (istoday ? '#fff' : '#000')};
  border: 0.1rem solid transparent;
  border-radius: 5px;
  /* padding: 10px; */
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  button {
    font-size: 10px;
    margin: 0;
    padding: 0;
    width: 18px;
    height: 18px;
    text-align: center;
  }

  span {
    font-size: 10px;
    margin-top: 5px;
  }

  div {
    margin: 0;
  }

  div {
    gap: 0;
  }
  /* &:hover {
    background-color: #78aee7;
  } */

  &:focus {
    outline: none;
    border: 0.1rem solid #007bff;
  }
`;
