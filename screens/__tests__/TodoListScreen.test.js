import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import TodoListScreen from "../TodoListScreen";
import useAuthentication from "../../utils/useAuthentication";

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock("../../utils/useAuthentication", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("TodoListScreen", () => {
  beforeEach(() => {
    useAuthentication.mockReturnValue({
      isAuthenticating: false,
      authenticateUser: jest.fn().mockResolvedValue(),
    });
  });

  it("renders TodoListScreen component if authentication is successful", async () => {
    render(<TodoListScreen navigation={mockNavigation} />);
    expect(screen.getByPlaceholderText(/Add something to do.../i));
  });

  it("adds a todo item to the list", async () => {
    render(<TodoListScreen navigation={mockNavigation} />);
    const input = screen.getByPlaceholderText(/Add something to do.../i);
    const addButton = screen.getByText(/^Add$/i);

    act(() => {
      fireEvent.changeText(input, "Todo 1");
    });

    act(() => {
      fireEvent.press(addButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Todo 1")).toBeTruthy();
    });
  });

  it("removes a todo item from the list", async () => {
    render(<TodoListScreen navigation={mockNavigation} />);

    // Add a todo
    const input = screen.getByPlaceholderText(/Add something to do.../i);
    const addButton = screen.getByText(/^Add$/i);

    act(() => {
      fireEvent.changeText(input, "Todo 1");
    });

    act(() => {
      fireEvent.press(addButton);
    });

    await waitFor(() => {
      // Assert the todo was added
      expect(screen.getByText(/Todo 1/i)).toBeTruthy();
    });

    // Press delete
    const deleteButton = screen.getByText(/^Delete$/i);
    act(() => {
      fireEvent.press(deleteButton);
    });

    await waitFor(() => {
      // Assert the todo was removed
      expect(screen.queryByText(/Todo 1/i)).toBeFalsy();
    });
  });

  it("updates a todo item when the edit flow is performed", async () => {
    render(<TodoListScreen navigation={mockNavigation} />);
    const input = screen.getByPlaceholderText(/Add something to do.../i);
    const addButton = screen.getByText(/^Add$/i);

    act(() => {
      fireEvent.changeText(input, "Todo 1");
    });
    
    act(() => {
      fireEvent.press(addButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Todo 1/i)).toBeTruthy();
    });

    const editButton = screen.getByText(/^Edit$/i);
    act(() => {
      fireEvent.press(editButton);
    });
    
    const updatedInput = screen.getByPlaceholderText(/Todo 1/i);
    
    act(() => {
      fireEvent.changeText(updatedInput, "Todo 1 Changed");
    });

    const saveButton = screen.getByText(/^Save$/i);
    act(() => {
      fireEvent.press(saveButton);
    });

    await waitFor(() => {
      // Assert the todo was edited
      expect(screen.getByText(/Todo 1 Changed/i)).toBeTruthy();
    });
  });
});
