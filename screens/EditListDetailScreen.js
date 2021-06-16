import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "../database/firebase";
const auth = firebase.auth();
import { Ionicons } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  TextInput,
} from "react-native";

export default function EditListDetailScreen({ navigation }) {
  const [details, setDetails] = useState([]);
  const [userID, setUserID] = useState([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("uid: " + user.uid);
        setUserID(user.uid);
        setInitialized(true);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (initialized) {
      const unsubscribeArr = [];
      firebase
        .firestore()
        .collection("Orders")
        .where("pickerID", "==", userID)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const unsubscribe = doc.ref
              .collection("Buyers")
              .onSnapshot((collection) => {
                const updatedDetails = collection.docs.map((doc) => {
                  return { id: doc.id, ...doc.data() };
                });
                setDetails(updatedDetails);
              });
            unsubscribeArr.push(unsubscribe);
          });
        });
      return () => {
        unsubscribeArr.forEach((unsubscribe) => {
          unsubscribe();
        });
      };
    }
  }, [initialized]);

  function deleteBuyer(buyerName) {
    //Delete buyer
    const unsubscribeArr = [];
    firebase
      .firestore()
      .collection("Orders")
      .where("pickerID", "==", userID)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const unsubscribe = doc.ref
            .collection("Buyers")
            .where("BuyerName", "==", buyerName)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => doc.ref.delete());
            });

          unsubscribeArr.push(unsubscribe);
        });
      });
    return () => {
      unsubscribeArr.forEach((unsubscribe) => {
        unsubscribe();
      });
    };
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <View
        style={{
          borderBottomColor: "#ccc",
          borderBottomWidth: 2,
          flexDirection: "row",
          padding: 10,
        }}
      >
        <View>
          <Text style={[styles.customerName]}>{item.BuyerName}</Text>
          <Image style={styles.buyerFace} source={{ uri: item.BuyerFace }} />
        </View>

        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Text style={[styles.customerRemark]}>{item.Remarks}</Text>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={() => deleteBuyer(item.BuyerName)}>
            <Ionicons name="trash" size={20} color="#944" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={details}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
  listImage: {
    width: 50,
    height: 50,
  },
  button: {
    padding: 20,
    margin: 10,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
  },

  customerName: {
    fontSize: 15,
    textAlign: "center",
    color: "black",
    padding: 10,
    paddingLeft: 20,
    top: 1,
  },
  customerRemark: {
    fontSize: 15,
    textAlign: "left",
    color: "black",
    paddingTop: 10,
    marginVertical: 10,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: "center",
  },

  buyerFace: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
