import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
import firebase from "../database/firebase";
import "firebase/auth";

const auth = firebase.auth();

export default function LoginScreen() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [errorText, setErrorText] = useState("");
  let history = useHistory();

  function SignIn(email, password) {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      console.log(error);
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
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
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
      <Button
        mode="contained"
        onPress={() => SignIn(email.value, password.value)}
      >
        Login
      </Button>
      <Button mode="contained" onPress={() => history.push("/register")}>
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 50,
  },
});
