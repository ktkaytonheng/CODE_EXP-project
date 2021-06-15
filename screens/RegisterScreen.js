import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
import firebase from "../database/firebase";
import "firebase/auth";
import { diffClamp } from "react-native-reanimated";

const auth = firebase.auth();

export default function RegisterScreen() {
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confPassword, setConfPassword] = useState({ value: "", error: "" });
  const [errorText, setErrorText] = useState("");
  let history = useHistory();

  function Register(email, password, confPassword) {
    if (password != confPassword) {
      setErrorText("Passwords do not match");
    }
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
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
    });
    return subscriber;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Register</Text>
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
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confPassword.value}
        onChangeText={(text) => setConfPassword({ value: text, error: "" })}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={() =>
          Register(email.value, password.value, confPassword.value)
        }
      >
        Register
      </Button>
      <Button mode="contained" onPress={() => history.push("/")}>
        Back
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
