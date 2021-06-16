import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Layout, Button } from "react-native-rapi-ui";
import { Section, SectionContent, SectionImage } from "react-native-rapi-ui";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "../database/firebase";
import { Ionicons } from "@expo/vector-icons";

const firestore = firebase.firestore();
const auth = firebase.auth();
const Stack = createStackNavigator();

export default function AddGroupBuy({ route, navigation }) {
  const [shopInfo, setShopInfo] = useState([]);
  const { shopName, orderID, location, menu } = route.params;
  const [order, setOrder] = useState("");
  const [count, setCount] = useState(0);
  const [userID, setUserID] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [userDP, setUserDP] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("uid: " + user.uid);
        setUserID(user.uid);
        setInitialized(true);
      } else history.push("/");
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (initialized) {
      firestore
        .collection("Users")
        .doc(userID)
        .onSnapshot((docSnapshot) => {
          const retrieved = docSnapshot.data();
          setUserInfo(retrieved);
          console.log("Retrieved image: " + retrieved.image);
          if (retrieved.image != null || retrieved.image != " ")
            setUserDP(retrieved.image);
          else setUserDP("/images/defaultdp.png");

          setInitialized(true);
        });
    }
  }, [initialized]);

  function AddBuyerToDB() {
    console.log(userInfo.name);
    console.log(userDP);
    console.log(order);
    firestore
      .collection("Orders")
      .doc(orderID)
      .collection("Buyers")
      .add({
        BuyerName: userInfo.name,
        BuyerFace: userDP,
        Remarks: order,
      })
      .then(() => {
        firestore
          .collection("Orders")
          .doc(orderID)
          .collection("Buyers")
          .doc("dummy")
          .delete();
      })
      .then(() => {
        console.log("Data added");
      });
    alert("Added order to picker's list!");
    navigation.goBack();
  }

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
      <TouchableOpacity onPress={() => deleteNote(orderID)}>
        {/* <Ionicons name="trash" size={16} color="blue" /> */}
      </TouchableOpacity>
      <Layout>
        {/* need to change to image */}
        <Section>
          <SectionImage source={{ uri: menu }} />
          <SectionContent>
            <View>
              <Text>
                <Text style={styles.textDefaultFont}>{shopName}</Text>
              </Text>
              <Text>
                <Text style={styles.textDefaultFont}>{location}</Text>
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
                value={order}
                placeholder="Chicken Rice"
                onChangeText={(input) => setOrder(input)}
              />
            </View>
          </SectionContent>
          <View>
            <View style={styles.button}>
              <Button onPress={AddBuyerToDB} text="Submit " size="lg" />
            </View>
          </View>
        </Section>
      </Layout>
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
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
});
