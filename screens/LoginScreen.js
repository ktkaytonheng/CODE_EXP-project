import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
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
  const [errorTextColor, setErrorTextColor] = useState("red");
  let history = useHistory();

  const { width, height } = Dimensions.get("window");

  function SignIn(email, password) {
    setErrorTextColor("green");
    setErrorText("Logging in...");
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      console.log(error.code);
      console.log(error.message);
      setErrorTextColor("red");
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
    return () => subscriber();
  });

  // Loading screen
  if (initializing) {
    return (
      <LinearGradient
        colors={["#f9c449", "#e8a49c", "#e8a49c"]}
        style={styles.container}
      >
        <ActivityIndicator size="large" />
      </LinearGradient>
    );
  }

  // Login screen
  return (
    <LinearGradient
      colors={["#f9c449", "#e8a49c", "#e8a49c"]}
      style={styles.container}
    >
      <Image
        style={{ maxHeight: height, maxWidth: width }}
        resizeMode="contain"
        source={require("../assets/FHlogo.png")}
      />
      <View
        style={{
          width: "80%",
        }}
      >
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
      </View>
      <View
        style={{
          width: "80%",
        }}
      >
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          secureTextEntry
        />
      </View>
      <View
        style={{
          width: "80%",
        }}
      >
        <Text
          style={{
            color: errorTextColor,
            fontSize: 15,
            marginVertical: 10,
            textAlign: "left",
            // marginLeft: "7%",
          }}
        >
          {errorText}
        </Text>
      </View>

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
});
