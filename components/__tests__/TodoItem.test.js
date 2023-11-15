import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import TodoItem from "../TodoItem";

describe("TodoItem", () => {
  const todoItemProps = {
    todo: {
      id: 1,
      label: 'Todo Item'
    },
    onUpdate: jest.fn(),
    onDelete: jest.fn()
  };

  it("renders TodoItem correctly", () => {
    render(<TodoItem {...todoItemProps} />);
    expect(screen.getByText(/Todo Item/i));
    expect(screen.getByText(/^Edit$/i));
    expect(screen.getByText(/^Delete$/i));
  });

  it("toggles the text input when the Todo Item text is pressed", async () => {
    render(<TodoItem {...todoItemProps} />);
    const touchableTarget = screen.getByText(/Todo Item/i);

    act(() => {
      fireEvent(touchableTarget, 'longPress');
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Todo Item")).toBeTruthy();
    });
  });

  it("triggers onUpdate when the Save button is clicked", async () => {
    render(<TodoItem {...todoItemProps} />);
    const touchableTarget = screen.getByText(/Todo Item/i);

    act(() => {
      fireEvent(touchableTarget, 'longPress');
    });

    const input = screen.getByPlaceholderText("Todo Item");
    const saveButton = screen.getByText(/^Save$/i);

    await waitFor(() => {
      expect(input).toBeTruthy();
    });

    act(() => {
      fireEvent.changeText(input, 'New Todo Item');
    });

    act(() => {
      fireEvent.press(saveButton);
    });

    await waitFor(() => {
      expect(todoItemProps.onUpdate).toHaveBeenCalledWith(todoItemProps.todo.id, 'New Todo Item');
    });
  });
  
  it("triggers onDelete when the Delete button is clicked", async () => {
    render(<TodoItem {...todoItemProps} />);
    const deleteButton = screen.getByText(/^Delete$/i);
    
    act(() => {
      fireEvent.press(deleteButton);
    });

    await waitFor(() => {
      expect(todoItemProps.onDelete).toHaveBeenCalledWith(todoItemProps.todo.id);
    });
  });
});
