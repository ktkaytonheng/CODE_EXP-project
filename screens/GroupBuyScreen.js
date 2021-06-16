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
import { Button } from "react-native-rapi-ui";
import { FlatGrid } from "react-native-super-grid";
import AddGroupBuy from "./AddGroupBuy";
import { createStackNavigator } from "@react-navigation/stack";
import ViewOrdersScreen from "./ViewOrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebase";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();
const firestore = firebase.firestore();

function GroupBuyScreen({ navigation }) {
  const [initialized, setInitialized] = useState(false);
  //save order collection to shop.info , need to retrive shopID
  const [orders, setOrders] = useState([]);
  //save real shop info
  const [orderInfo, setOrderInfo] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("Orders")
      .onSnapshot((collection) => {
        const orderCollection = collection.docs.map((doc) => doc.data());
        setOrders(orderCollection);
        setInitialized(true);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (initialized) {
      console.log("Orders: " + { ...orders });
      const orderArr = [...orders];
      for (order in orderArr) {
        console.log(order);
        firestore
          .collection("Shops")
          .doc(order.shopID)
          .onSnapshot((docSnapshot) => {
            order = () => {
              return {
                ...order,
                ...docSnapshot.data(),
              };
            };
            console.log(order);
          });
        setOrders(orderArr);
      }
    }
  }, [initialized]);

  const shopName = firebase.firestore().collection("Shops");
  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <Text style={{ textAlign: "center" }}>{item.shopID}</Text>
        <View style={styles.container}>
          {/* <ImageBackground source={{ uri: item.shopMenu }} style={styles.image}> */}
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
                newShopName: item.shopID,
              })
            }
            size="sm"
          />
          {/* </ImageBackground> */}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container2}>
      <FlatGrid
        itemDimension={"2"}
        data={orders}
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
        {/* <ActionButton.Item
          buttonColor="#3498db"
          title="Dabao for others"
          onPress={() => navigation.navigate("GroupBuyGroupScreen")}
        >
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item> */}
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
      {/* <Stack.Screen
        options={{
          headerTitle: "Start a new Group Buy ",
          headerTitleAlign: "center",
        }}
        name="GroupBuyGroupScreen"
        component={GroupBuyGroupScreen}
      /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
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
