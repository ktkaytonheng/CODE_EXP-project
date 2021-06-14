import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";

const db = firebase.firestore().collection("shopInfo");

export default function GroupBuyScreen() {

  const [shopInfo, setShopInfo] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase 
      .firestore() 
      .collection("shopInfo")
      .onSnapshot((collection) => {
        const updatedShopInfo = collection.docs.map((doc) => doc.data());
        setShopInfo(updatedShopInfo);
      })

      return () => {unsubscribe();}
  }, [])

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{item.shopName}</Text>
        <Text>{item.shopLocation}</Text>
        <Image 
          source={{uri:item.shopMenu}}
          style={styles.listImage}
        />
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={shopInfo}
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
  }
});