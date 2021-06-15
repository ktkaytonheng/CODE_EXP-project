import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { Link } from "react-router-native";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import firebase from "../database/firebase";
import "firebase/auth";

const auth = firebase.auth();

export default function HomeScreen() {
  let history = useHistory();

  function SignOut() {
    auth
      .signOut()
      .then(() => console.log("User signed out"))
      .then(() => history.push("/"));
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgreen",
      }}
    >
      <Text>Home!</Text>
      <Button onPress={() => SignOut()}>Sign Out</Button>
      <FontAwesome name="glass" size={99} color="rgba(255, 255, 0, 0.5)" />
    </View>
  );
}
