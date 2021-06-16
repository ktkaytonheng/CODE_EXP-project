import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from "../database/firebase";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Button from "../components/Button";

const firestore = firebase.firestore();
const auth = firebase.auth();

export default function AddListScreen({ navigation, route }) {
  const [initialized, setInitialized] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { shopName, shopMenu, shopLocation, shopID } = route.params;
  const [userID, setUserID] = useState();
  const [userDP, setUserDP] = useState();
  const [paxes, setPax] = useState(1);
  const [timing, setTime] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTime(date);
    hideDatePicker();
  };

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
      const unsubscribe = firestore
        .collection("Users")
        .doc(userID)
        .onSnapshot((docRef) => {
          const retrievedUserInfo = { ...docRef.data() };
          setUserInfo(retrievedUserInfo);
          if (retrievedUserInfo.image != null || retrieved.image != " ")
            setUserDP(retrievedUserInfo.image);
          else setUserDP("/images/defaultdp.png");
        });
    }
  }, [initialized]);

  const onDeleteBTN = () => {
    firestore
      .collection("Orders")
      .add({
        currentPax: 0,
        maxPax: parseInt(paxes),
        pickerID: userID,
        pickerName: userInfo.name,
        pickerPic: userInfo.image,
        shopMenu: shopMenu,
        shopLocation: shopLocation,
        shopName: shopName,
        time: timing.toLocaleString("en-GB", { timeZone: "UTC" }),
      })
      .then((docRef) => {
        console.log(docRef.id);
        firestore
          .collection("Orders")
          .doc(docRef.id)
          .collection("Buyers")
          .doc("dummy")
          .set({
            1: "1",
          });
      });

    alert("Order posted successfully!");
    navigation.goBack();
  };

  function increment() {
    Alert.alert("Confirmation", "Are the details correct?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: onDeleteBTN },
    ]);
  }

  return (
    <LinearGradient
      colors={["#f9c449", "#e8a49c", "#e8a49c"]}
      style={styles.container}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: "20%",
          marginVertical: "10%",
          marginBottom: "20%",
          backgroundColor: "'rgba(255,255,255,0.3)'",
        }}
      >
        <Text
          style={{
            marginTop: 10,
            textAlign: "center",
            fontSize: 30,
          }}
        >
          {shopName}
        </Text>
        <Image style={styles.image} source={{ uri: shopMenu }} />
        <Text style={styles.text}>Stall Location</Text>
        <View style={styles.textArea}>
          <Text style={styles.text}>{shopLocation}</Text>
        </View>

        <Text style={styles.text}>Enter time</Text>
        <Button
          style={styles.textArea}
          title={timing.toLocaleString("en-GB", { timeZone: "UTC" }).toString()}
          onPress={showDatePicker}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Text style={styles.text}>Enter pax</Text>
        <Picker
          style={styles.pickerStyle}
          selectedValue={paxes}
          onValueChange={(itemValue, itemIndex) => setPax(itemValue)}
          itemStyle={{ height: "100%", color: "blue" }}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="9" value="9" />
        </Picker>
        <View
          style={{
            // width: "100%",
            justifyContent: "flex-end",
            // alignItems: "center",
            alignSelf: "center",
            // backgroundColor: "pink",
          }}
        >
          <TouchableOpacity style={styles.button} onPress={increment}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                // backgroundColor: 'pink',
              }}
            >
              <FontAwesome name="check-circle" size="20" color="green" />
              <Text style={styles.buttonText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingTop: "10%",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textArea: {
    justifyContent: "center",
    alignItems: "center",
    // width: "75%",
    height: 30,
    paddingHorizontal: 10,
    margin: 10,
    borderColor: "grey",
    borderWidth: 1,
  },
  text: {
    // marginTop:
    textAlign: "center",
  },
  submit: {
    height: 40,
    width: "75%",
    padding: 4,
    margin: 10,
    color: "white",
    borderRadius: 20,
    backgroundColor: "blue",
    justifyContent: "center",
    textAlign: "center",
  },
  button: {
    width: "100%",
    height: 40,
    // alignItems: 'center',
    justifyContent: "center",
    // marginBottom: 36,
    // justifyContent: 'flex-end',
    backgroundColor: "pink",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    marginHorizontal: 10,
  },
  pickerStyle: {
    width: "40%",
    color: "black",
    // backgroundColor: 'black',
    justifyContent: "center",
    // borderWidth: 0,
    // borderColor: "white",
    height: "15%%",
  },
});
