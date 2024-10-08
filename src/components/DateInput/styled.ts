import styled from 'styled-components';

export const InputContainer = styled.div`
  width: 230px;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  border: 0.01rem solid #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;

  img {
    height: 1rem;
  }
`;

export const InputLabel = styled.label`
  font-family: 'Open Sans', sans-serif;
`;

export const StyledInput = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 0 0.4rem;
  border: none;
  outline: none;
`;

export const ClearButton = styled.button`
  padding: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;
