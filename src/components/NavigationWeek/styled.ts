import styled from 'styled-components';
export const NavigationWeeks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const NavigationButton = styled.button`
  background: none;
  display: flex;
  align-items: center;
  border: none;
  color: #007bff;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};

  &:hover {
    color: #0056b3;
  }
`;
