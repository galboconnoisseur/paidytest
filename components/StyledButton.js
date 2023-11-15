import React, { useMemo } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const StyledButton = ({ label, onPress, isDisabled = false, styleOverride }) => {

  const computedStyles = useMemo(() => (
    [
      styles.button,
      isDisabled && styles.disabledButton,
      styleOverride && styleOverride
    ]
  ), [styles, isDisabled, styleOverride])

  return (
    <TouchableOpacity
      style={computedStyles}
      disabled={isDisabled}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray'
  }
});

export default StyledButton;
