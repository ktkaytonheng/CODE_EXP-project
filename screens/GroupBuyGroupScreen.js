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
const GroupBuyGroupScreen = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
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
      <Text style={{ fontSize: 24 }}>Store to dabao from</Text>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={(input) => setText(input)}
      />
      <Text style={{ fontSize: 24 }}>How many packets?</Text>
      <View>
        <Button title="Pick a time" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <Text> Time picked : {JSON.stringify(time)}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ViewOrdersScreen")}
        >
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
    backgroundColor: "blue",
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
});
