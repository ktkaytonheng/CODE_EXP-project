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
import firebase from "../database/firebase";
import { Ionicons } from "@expo/vector-icons";

const firestore = firebase.firestore();
const Stack = createStackNavigator();

export default function AddGroupBuy({ route, navigation }) {
  const [shopInfo, setShopInfo] = useState([]);
  const { newShopName } = route.params;
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("Shops")
      .onSnapshot((collection) => {
        const updatedShopInfo = collection.docs.map((doc) => doc.data());
        setShopInfo(updatedShopInfo);
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
                  <Text style={styles.textDefaultFont}>{newShopName}</Text>
                </Text>
                <Text>
                  <Text style={styles.textDefaultFont}>
                    {item.shopLocation}
                  </Text>
                </Text>

                <Text>
                  <Text style={styles.textDefaultFont}>No. Food:</Text>
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setCount(count - 1)}
                  >
                    <Ionicons name="remove-circle" size={20} color="blue" />
                  </TouchableOpacity>
                  <Text style={styles.textDefaultFont}> {count}</Text>
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setCount(count + 1)}
                  >
                    <Ionicons name="add-circle" size={20} color="blue" />
                  </TouchableOpacity>
                </Text>
                <Text style={styles.textDefaultFont}>Enter your orders: </Text>
                <TextInput
                  style={styles.textInput}
                  value={text}
                  placeholder="Chicken Rice"
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
    width: "95%",
    height: 150,
    padding: 10,
    marginTop: 20,
  },
  icon: {
    alignSelf: "flex-end",
    paddingLeft: 5,
  },
  textDefaultFont: {
    fontSize: 24,
    marginVertical: 15,
    paddingEnd: 5,
    textAlign: "center",
  },
});
