import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TextInput,TouchableOpacity } from "react-native";
import * as NumericInput from "react-numeric-input";
import firebase from "../database/firebaseDB";

export default function AddListScreen({ route }) {
  console.log(route.params);


  return (
    <Text>{route.params}</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 40,
    justifyContent: "center",
    alignItems:"center",
  },
  textArea: {
    justifyContent: "center",
    alignItems:"center",
    width: "70%",
    padding: 5,
    margin: 2,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1
  },
  submit: {
    width: "70%",
    padding: 4,
    margin: 10,
    color: "white",
    borderRadius: 20,
    backgroundColor: "blue",
    justifyContent: "center",
    textAlign: "center",
  },
});