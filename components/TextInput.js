import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

export default function TextInput({ style, errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        theme={{ colors: { primary: "black", underlineColor: "transparent" } }}
        {...props}
        style={styles.input}
        mode="outlined"
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 1,
    // marginHorizontal: 10,
    alignItems: "center",
  },
  input: {
    backgroundColor: theme.colors.surface,
    width: "100%",
    height: 35,
  },
  description: {
    fontSize: 13,
    color: "#000000",
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
