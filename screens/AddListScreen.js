import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from "../database/firebase";
import { Picker } from "@react-native-picker/picker";

const firestore = firebase.firestore();
const auth = firebase.auth();

export default function AddListScreen({ navigation, route }) {
  const [initialized, setInitialized] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { shopName, shopMenu, shopLocation, shopID } = route.params;
  const [userID, setUserID] = useState();
  const [paxes, setPax] = useState(1);
  const [timing, setTime] = useState(
    new Date().toLocaleString("en-GB", { timeZone: "UTC" })
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTime(date.toLocaleString("en-GB", { timeZone: "UTC" }));
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

  function AddOrderToDB() {
    if (initialized) {
      firestore
        .collection("Orders")
        .add({
          currentPax: 0,
          maxPax: paxes,
          pickerID: userID,
          shopID: shopID,
          time: timing,
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
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ margin: 3, textAlign: "center" }}>{shopName}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image style={styles.image} source={{ uri: shopMenu }} />
        {/*<Text style={{fontSize: 20}}>Add List</Text>*/}
      </View>
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginStart: "20%",
        }}
      >
        <Text style={styles.text}>Stall Location</Text>
        <Text style={styles.textArea}>{shopLocation}</Text>
        <Text style={styles.text}>Enter time</Text>
        <Button
          style={styles.textArea}
          title={timing}
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
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setPax(itemValue)}
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
        <TouchableOpacity style={styles.submit} onPress={AddOrderToDB}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textArea: {
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    padding: 15,
    margin: 2,
    borderColor: "grey",
    borderWidth: 1,
  },
  text: {
    marginTop: 5,
  },
  submit: {
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
    textAlign: "center",
    color: "white",
  },
  pickerStyle: {
    width: "80%",
    color: "red",
    justifyContent: "center",
    color: "red",
    borderWidth: 20,
    borderColor: "black",
  },
});
