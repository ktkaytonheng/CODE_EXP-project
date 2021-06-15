import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import { useHistory } from "react-router-dom";
import firebase from "../database/firebase";
import "firebase/auth";

const auth = firebase.auth();

export default function LoginScreen() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [errorText, setErrorText] = useState(" ");
  let history = useHistory();

  function SignIn(email, password) {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      console.log(error.code);
      console.log(error.message);
      switch (error.code) {
        case "auth/invalid-email":
          setErrorText("Please type in an appropriate email");
          break;
        case "auth/user-not-found":
          setErrorText("Email not found");
          break;
        case "auth/wrong-password":
          setErrorText("Invalid password");
          break;
        default:
          setErrorText("Error checking credentials, please retry");
          break;
      }
    });
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        console.log(user.email);
        console.log("Successful login");
        history.push("/home");
      }
      setInitializing(false);
    });
    return subscriber;
  });

  // Loading screen
  if (initializing) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Login screen
  return (
    <LinearGradient
      colors={["#f9c449", "#e8a49c", "#e8a49c"]}
      style={styles.container}
    >
      <Image
        style={styles.titleLogo}
        source={require("../assets/FHlogo.png")}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        secureTextEntry
      />
      <Text style={styles.errorText}>{errorText}</Text>
      <Button
        mode="contained"
        onPress={() => SignIn(email.value, password.value)}
      >
        Login
      </Button>
      <Button mode="contained" onPress={() => history.push("/register")}>
        Register
      </Button>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleLogo: {
    width: 600,
    height: 250,
    marginBottom: 50,
  },
  errorText: {
    color: "red",
    fontSize: 20,
    marginBottom: 10,
  },
});
