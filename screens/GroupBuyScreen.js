import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  TextInput,
} from "react-native";
import { Layout, Section, SectionContent } from "react-native-rapi-ui";
import { Button } from "react-native-rapi-ui";
import { FlatGrid } from "react-native-super-grid";
import AddGroupBuy from "./AddGroupBuy";
import GroupBuyGroupScreen from "./GroupBuyGroupScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ViewOrdersScreen from "./ViewOrdersScreen";
const Stack = createStackNavigator();
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";
import { FloatingAction } from "react-native-floating-action";
import filter from "lodash.filter";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
const db = firebase.firestore().collection("shopInfo");

function GroupBuyScreen({ navigation }) {
  const [shopInfo, setShopInfo] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("shopInfo")
      .onSnapshot((collection) => {
        const updatedRemarks = collection.docs.map((doc) => doc.data());
        setShopInfo(updatedRemarks);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <Text style={{ textAlign: "center" }}>{item.shopName}</Text>
        <View style={styles.container}>
          <ImageBackground source={{ uri: item.shopMenu }} style={styles.image}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => deleteNote(item.id)}
            >
              <Ionicons name="trash" size={20} color="blue" />
            </TouchableOpacity>
            <View style={styles.body}>
              {/* <TouchableOpacity
                style={styles.button}
                text="Order Group buy "
                onPress={() =>
                  navigation.navigate("AddGroupBuy", {
                    newShopName: item.shopName,
                  })
                }
              >
                <Text style={styles.text}>Order Group buy</Text>
              </TouchableOpacity> */}
            </View>
            <View style={styles.overlaytext}>
              <Text>Delivered by : "Weemeng"</Text>
              <Text>Order by 6pm</Text>
            </View>
            <Button
              text="Dabao"
              rightContent={<Ionicons name="arrow-forward" size={20} />}
              onPress={() =>
                navigation.navigate("AddGroupBuy", {
                  newShopName: item.shopName,
                })
              }
              size="sm"
            />
          </ImageBackground>
        </View>
      
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatGrid
        itemDimension={"2"}
        data={shopInfo}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={renderItem}
        // keyExtractor={(item) => item.id.toString()}
      />

        
<ActionButton buttonColor="#2e64e5">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="View My Current Orders"
            onPress={() => navigation.navigate("ViewOrdersScreen")}
          >
            <Icon name="camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Dabao for others"
            onPress={() => navigation.navigate("GroupBuyGroupScreen")}
          >
            <Icon name="md-images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
    </View>
  );
}

export default function GroupBuyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: "Join a Group Buy",
          headerTitleAlign: "center",
        }}
        name="GroupBuyScreen"
        component={GroupBuyScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "Add Food Order", headerTitleAlign: "center" }}
        name="AddGroupBuy"
        component={AddGroupBuy}
      />
      <Stack.Screen
        options={{
          headerTitle: "View Current Orders",
          headerTitleAlign: "center",
        }}
        name="ViewOrdersScreen"
        component={ViewOrdersScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "Start a new Group Buy ",
          headerTitleAlign: "center",
        }}
        name="GroupBuyGroupScreen"
        component={GroupBuyGroupScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 5,
    backgroundColor: "blue",
    borderRadius: 10,
    width: "50%",
    height: "20%",
  },
  text: {
    fontSize: 10,
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    borderWidth: 2,
  },
  overlaytext: {
    textAlign: "center",
    backgroundColor: "white",
    justifyContent: "center",
    borderWidth: 1,
  },
  body: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 200,
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  icon: {
    alignSelf: "flex-end",
    marginTop: -5,
  },
});
