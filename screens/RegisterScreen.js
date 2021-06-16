import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { useHistory } from "react-router-dom";
import firebase from "../database/firebase";
import "firebase/auth";

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function RegisterScreen() {
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState();
  const [fullname, setFullname] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confPassword, setConfPassword] = useState({ value: "", error: "" });
  const [errorText, setErrorText] = useState(" ");
  const [errorTextColor, setErrorTextColor] = useState('red');
  let history = useHistory();

  const {width, height} = Dimensions.get("window");

  function Register(fullname, email, password, confPassword) {
    setErrorTextColor('green');
    setErrorText("Creating account...");
    if (password != confPassword) {
      setErrorTextColor('red');
      setErrorText("Passwords do not match");
      return;
    }
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      console.log(error.code);
      setErrorTextColor('red');
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
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        firestore.collection("Users").doc(user.uid).set({
          name: fullname.value,
          email: email.value,
        });
        console.log("Successful login");
        history.push("/home");
      }
    });
    return () => subscriber();
  });

  return (
    <LinearGradient
      colors={["#f9c449", "#e8a49c", "#e8a49c"]}
      style={styles.container}
    >
      <Image
        style={{
          maxHeight: height,
          maxWidth: width
        }}
        resizeMode='contain'
        source={require("../assets/FHlogo.png")}
      />
      <TextInput
        label="Full Name"
        returnKeyType="next"
        value={fullname.value}
        onChangeText={(text) => setFullname({ value: text, error: "" })}
        autoCapitalize="none"
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
      <Text style={{
        color: errorTextColor,
        fontSize: 15,
        marginVertical: 10,
        textAlign: 'left',
        marginLeft: '7%'
        }}>{errorText}</Text>
      <Button
        mode="contained"
        onPress={() =>
          Register(
            fullname.value,
            email.value,
            password.value,
            confPassword.value
          )
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
    // alignItems: "center",
    justifyContent: "center",
  },
});
