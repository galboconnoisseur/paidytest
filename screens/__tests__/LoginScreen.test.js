import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';

const mockNavigation = {
  navigate: jest.fn()
}

describe('LoginScreen', () => {
  it('renders LoginScreen component', () => {
    render(<LoginScreen navigation={mockNavigation} />);
    const introText = screen.getByText(/Authenticate to Start your todo list!/i);
    const signInButton = screen.getByText(/^Authenticate$/i);
    expect(introText).toBeTruthy();
    expect(signInButton).toBeTruthy();
  });

  it('navigates to TodoScreen when the sign-in button is pressed', () => {
    render(<LoginScreen navigation={mockNavigation} />);
    const signInButton = screen.getByText(/^Authenticate$/i);
    fireEvent.press(signInButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Todo');
  });
}) 