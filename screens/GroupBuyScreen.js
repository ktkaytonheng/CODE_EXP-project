import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Layout, Section, SectionContent } from "react-native-rapi-ui";
import { Button } from "react-native-rapi-ui";

import AddGroupBuy from "./AddGroupBuy";
import { createStackNavigator } from "@react-navigation/stack";
import ViewOrdersScreen from "./ViewOrdersScreen";
const Stack = createStackNavigator();
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";

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
        <Text>{item.shopLocation}</Text>
        <Image source={{ uri: item.shopMenu }} style={styles.listImage} />
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity>
        <Layout>
          <Section>
            <SectionContent>
              {/* need to change to image */}
              <View style={styles.button}>
                <Button
                  text="Order Group buy "
                  onPress={() =>
                    navigation.navigate("AddGroupBuy", {
                      newShopName: item.shopName,
                    })
                  }
                  size="lg"
                />
              </View>
              <View style={styles.button}>
                <Button
                  text="View Last orders "
                  onPress={() => navigation.navigate("ViewOrdersScreen")}
                  size="lg"
                />
              </View>
            </SectionContent>
          </Section>
        </Layout>
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

export default function GroupBuyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerTitle: "Join a Group Buy" }}
        name="GroupBuyScreen"
        component={GroupBuyScreen}
      />
      <Stack.Screen
        optionss={{ headerTitle: "Add Food Order" }}
        name="AddGroupBuy"
        component={AddGroupBuy}
      />
      <Stack.Screen
        options={{ headerTitle: "View Current Orders" }}
        name="ViewOrdersScreen"
        component={ViewOrdersScreen}
      />
    </Stack.Navigator>
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
});
