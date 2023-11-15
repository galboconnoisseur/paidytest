import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loader;
