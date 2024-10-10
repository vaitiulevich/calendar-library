import styled from 'styled-components';
export const NavigationWeeks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-wrap: nowrap;
  font-weight: 600;
  margin-bottom: 0.5rem;
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
