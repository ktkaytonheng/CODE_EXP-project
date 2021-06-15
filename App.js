import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";
import LoginScreen from "./screens/LoginScreen";
import TabNavigatorScreen from "./screens/TabNavigatorScreen";
import RegisterScreen from "./screens/RegisterScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firebase from "./database/firebase";
import "firebase/auth";

const auth = firebase.auth();

export default function App() {
  return (
    <NativeRouter>
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        <Route exact path="/home" component={TabNavigatorScreen} />
        <Route exact path="/register" component={RegisterScreen} />
      </Switch>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
