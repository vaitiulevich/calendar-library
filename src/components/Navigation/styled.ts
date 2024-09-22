import styled from 'styled-components';

export const MonthHeader = styled.h2`
  margin: 0;
  padding: 10px 0;
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;

export const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 10px;

  button {
    background: none;
    border: none;
    color: #007bff;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      color: #0056b3;
    }
  }
`;
