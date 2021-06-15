import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { useHistory } from "react-router-dom";
import firebase from "../database/firebase";
import "firebase/auth";
import { diffClamp } from "react-native-reanimated";

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function RegisterScreen() {
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confPassword, setConfPassword] = useState({ value: "", error: "" });
  const [errorText, setErrorText] = useState(" ");
  let history = useHistory();

  function Register(email, password, confPassword) {
    if (password != confPassword) {
      setErrorText("Passwords do not match");
      return;
    }
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          setErrorText("Invalid email");
          return;
        case "auth/weak-password":
          setErrorText("Password must be at least 6 characters");
          return;
        case "auth/email-already-in-use":
          setErrorText("Email is already taken");
          return;
        default:
          setErrorText("Unable to create account, please try again");
          return;
      }
    });
    // firestore()
    //   .collection('Users')
    //   .add({

    //   })
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
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confPassword.value}
        onChangeText={(text) => setConfPassword({ value: text, error: "" })}
        secureTextEntry
      />
      <Text style={styles.errorText}>{errorText}</Text>
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
