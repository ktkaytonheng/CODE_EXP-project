import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Layout, Button } from "react-native-rapi-ui";
import { Section, SectionContent, SectionImage } from "react-native-rapi-ui";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "../database/firebaseDB";
import { Ionicons } from "@expo/vector-icons";
const db = firebase.firestore().collection("shopInfo");
const Stack = createStackNavigator();

export default function AddGroupBuy({ route, navigation }) {
  const [shopInfo, setShopInfo] = useState([]);
  const { newShopName } = route.params;
  const [text, setText] = useState("");

  useEffect(() => {
    const unsubscribeArr = [];
    firebase
      .firestore()
      .collection("shopInfo")
      .where("shopName", "==", newShopName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const unsubscribe = doc.ref
            .collection("menuItems")
            .onSnapshot((collection) => {
              const updatedShopInfo = collection.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              });
              setShopInfo(updatedShopInfo);
            });
          unsubscribeArr.push(unsubscribe);
        });
      });
    return () => {
      unsubscribeArr.forEach((unsubscribe) => {
        unsubscribe();
      });
    };
  }, []);

  useEffect(() => {
    if (route.params?.text) {
      const newNote = {
        remarksItem: route.params.text,
      };
      // db.add(newNote);
    }
  }, [route.params?.text]);

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
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={16} color="blue" />
        </TouchableOpacity>
        <Layout>
          {/* need to change to image */}
          <Section>
            <SectionImage source={require("../assets/image.jpg")} />
            <SectionContent>
              <View>
                <Text>
                  <Text> {newShopName}</Text>
                </Text>
                <Text>
                  {" "}
                  <Text>Location:</Text>{" "}
                </Text>
                <Text>
                  {" "}
                  <Text>Time:</Text>{" "}
                </Text>
                <Text>
                  {" "}
                  <Text>Available Pax:</Text>{" "}
                </Text>
                <Text> Add Orders: </Text>
                <TextInput
                  style={styles.textInput}
                  value={text}
                  onChangeText={(input) => setText(input)}
                />
              </View>
            </SectionContent>
            <View>
              <View style={styles.button}>
                <Button
                  onPress={() =>
                    navigation.navigate("GroupBuyScreen", { text })
                  }
                  text="Submit "
                  size="lg"
                />
              </View>
            </View>
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
        // keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
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

  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginTop: 20,
  },
});
