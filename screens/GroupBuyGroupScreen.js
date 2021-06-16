import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";
import Icon from "react-native-vector-icons/Ionicons";

const GroupBuyGroupScreen = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [count, setCount] = useState(0);

  function AddGroupBuy() {
    firebase.firestore().collection("Orders").add({
      currentPax: 0,
      maxPax: count,
      pickerID: "Wee Meng",
      shopID: text,
      time: time,
    });
    alert("Success");
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    setTime(time);
    console.warn("A time has been picked: ", time);
    hideDatePicker();
  };

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <Text style={styles.standardText}>Store to dabao from</Text>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={(input) => setText(input)}
      />
      <Text style={styles.standardText}>How many packets?</Text>
      <View>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setCount(count - 1)}
        >
          <Ionicons name="remove-circle" size={20} color="blue" />
        </TouchableOpacity>
        <Text style={styles.standardText}> {count}</Text>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setCount(count + 1)}
        >
          <Ionicons name="add-circle" size={20} color="blue" />
        </TouchableOpacity>
      </View>
      <View>
        <Button
          style={{ backgroundColor: "#add8e6" }}
          title="Pick a time"
          onPress={showDatePicker}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <Text style={styles.standardText}>
        {" "}
        Time picked : {JSON.stringify(time)}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => AddGroupBuy()}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {/* <Text>{text.toUpperCase()}</Text> */}
    </View>
  );
};
export default GroupBuyGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#add8e6",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 80,
  },
  buttonText: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  icon: {
    paddingLeft: 5,
  },
  standardText: {
    fontSize: 24,
  },
});
