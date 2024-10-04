import styled from 'styled-components';

export const PanelContainer = styled.div`
  width: 240px;
  border: 1px solid #ccc;
  padding: 0.6rem;
  border-radius: 8px;
  font-family: 'Open Sans', sans-serif;
  color: #333;
`;

export const TaskInputForm = styled.form`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  align-items: center;
`;

export const TaskTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

export const TaskInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
`;

export const AddButton = styled.button`
  padding: 10px 15px;
  color: #000;
  border: none;
  border-radius: 0 3px 3px 0;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c2c2c2;
  }
`;

export const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
`;

export const TaskItem = styled.li`
  padding: 8px;
  border-bottom: 1px solid #ddd;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }

  span {
    width: 80%;
    word-wrap: break-word;
    white-space: normal;
  }
`;

export const DeleteTaskButton = styled.button`
  display: flex;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const CloseButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ccc;
  }
`;
