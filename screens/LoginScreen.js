import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StyledButton from "../components/StyledButton";

const LoginScreen = ({ navigation }) => {
  const handleSignIn = async () => {
    navigation.navigate("Todo");
  };

  return (
    <View style={styles.container}>
      <Text>Authenticate to start your todo list!</Text>
      <StyledButton
        label="Authenticate"
        onPress={handleSignIn}
        styleOverride={{ alignSelf: "auto", marginTop: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
