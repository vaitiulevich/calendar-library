import styled from 'styled-components';

export const ClearButton = styled.button`
  background: #ffffff;
  border: 1px solid #c8c8c8;
  margin-top: 0.2rem;
  width: 250px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background-color: #dadada;
  }
`;

export const RangeCalendatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
