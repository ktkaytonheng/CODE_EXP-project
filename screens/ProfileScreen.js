import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firebase from "../database/firebase";
import "firebase/auth";

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function HomeScreen() {
  let history = useHistory();

  function SignOut() {
    auth
      .signOut()
      .then(() => console.log("User signed out"))
      .then(() => history.push("/"));
  }

  return (
    <LinearGradient
      colors={["#f9c449", "#e8a49c", "#e8a49c"]}
      style={styles.container}
    >
      <Text>Home!</Text>
      <Button onPress={() => SignOut()}>Sign Out</Button>
      <FontAwesome name="glass" size={99} color="rgba(255, 255, 0, 0.5)" />
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
