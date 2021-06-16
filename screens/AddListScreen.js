import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TextInput,TouchableOpacity, Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from "../database/firebaseDB";
import {Picker} from '@react-native-picker/picker';


export default function AddListScreen({ route }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { shopName, shopMenu, shopLocation} = route.params;
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
    console.warn(date);
    hideDatePicker();
  };

  function increment() {
    if(parseInt(paxes) === 0){
      alert('Please Enter Pax');
      return;
    }
    firebase.firestore().collection("Orders").add({
      currentPax: parseInt("0"),
      maxPax: parseInt(paxes),
      pickerID: "currentUser",
      shopID: shopName,
      time: timing,
    });
    alert('Success');
  }

  return (
    <View style={styles.container}>
      <Text style={{margin:3, textAlign: 'center'}}>{shopName}</Text>
      <View style={{alignItems:"center", justifyContent: 'center'}}>
        <Image style={styles.image} source={{uri: shopMenu}}/>
        {/*<Text style={{fontSize: 20}}>Add List</Text>*/}
      </View>
        <View style={{alignItems:"flex-start", justifyContent: 'flex-start', marginStart:"20%"}}>
          <Text style={styles.text}>Stall </Text>
          <Text style={styles.textArea}>{shopLocation}</Text>
          <Text style={styles.text}>Enter time</Text>
          <Button style={styles.textArea} title={timing.toLocaleString('en-GB', { timeZone: 'UTC' }).toString()} onPress={showDatePicker} />
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
          <TouchableOpacity style={styles.submit} onPress={increment}>
            <Text style={styles.button}>Submit</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 40,
    justifyContent: "center",
    alignItems:"center",
  },
  textArea: {
    justifyContent: "center",
    alignItems:"center",
    width: "75%",
    padding: 15,
    margin: 2,
    borderColor: "grey",
    borderWidth: 1
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
  pickerStyle:{  
    width: "80%", 
    color: "black", 
    justifyContent: 'center', 
    borderWidth: 20,
    borderColor: "red",
  },
});
