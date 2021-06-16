import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Button,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import AddListScreen from "./AddListScreen";
import EditListDetailScreen from "./EditListDetailScreen";
import firebase from "../database/firebase";

const firestore = firebase.firestore();

function StallsScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("My listing")}
          title="My listings"
        />
      ),
    });
  });

  const [shops, setShops] = React.useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Shops")
      .onSnapshot((collection) => {
        const updatedShops = collection.docs.map((doc) => {
          return { shopID: doc.id, ...doc.data() };
        });
        setShops(updatedShops);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  function renderItem({ item }) {
    return (
      <View>
        <Text style={styles.itemName}>{item.shopName}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Add List", { ...item });
          }}
        >
          <View style={[styles.itemContainer]}>
            <ImageBackground
              source={{ uri: item.shopMenu }}
              style={styles.image}
            >
              <Text style={styles.itemCode}>{item.shopLocation}</Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#f9c449", "#e8a49c", "#e8a49c"]}
      style={styles.container}
    >
      <FlatGrid
        itemDimension={130}
        data={shops}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={renderItem}
      />
    </LinearGradient>
  );
}

const Stack = createStackNavigator();

export default function StallsScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StallsScreen" component={StallsScreen} />
      <Stack.Screen name="Add List" component={AddListScreen} />
      <Stack.Screen name="My listing" component={EditListDetailScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 150,
  },
  itemName: {
    fontSize: 10,
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
});
