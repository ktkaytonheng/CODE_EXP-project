import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TextInput,TouchableOpacity } from "react-native";
import firebase from "../database/firebaseDB";

export default function AddListScreen({ route }) {
  const { id, shopName, shopMenu, shopLocation} = route.params;
  //const { id, shopName, shopMenu, shopLocation} = {id:"1",shopName: "hello", shopMenu: "https://i.redd.it/s0ffeqlnq9361.jpg", shopLocation: "lol"};
  const [paxes, setPax] = useState("");
  const [timing, setTime] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{margin:3, textAlign: 'center'}}>{shopName}</Text>
      <View style={{alignItems:"center", justifyContent: 'center'}}>
        <Image style={styles.image} source={{uri: shopMenu}}/>
        <Text style={{fontSize: 20}}>Add List</Text>
        <TextInput 
          style={styles.textArea} 
          placeholder='Time' 
          multiline="true"
          onChangeText={
            (value) => setPax(value)
          }
        />
        {/*<NumericInput min={0} max={100} value={50}/>*/}
        <TextInput 
          style={styles.textArea} 
          placeholder='Pax' 
          multiline="true"
          onChangeText={
            (value) => setTime(value)
          }
        />
        <TextInput 
          style={styles.textArea}  
          value={shopLocation}
          numberOfLines={4}
          multiline="true"
        />
        <TouchableOpacity style={styles.submit} onPress={
          () => {
            if (!timing.trim()) {
              alert('Please Enter Time');
              return;
            }
            if (!paxes.trim()) {
              alert('Please Enter Pax');
              return;
            }
            //Checked Successfully
            firebase.firestore().collection("test").add({
              pax: paxes,
              picker: "currentUser",
              shopID: id,
              time: timing,
            });
            alert('Success');
          }}>
          Submit
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
    width: "70%",
    padding: 5,
    margin: 2,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1
  },
  submit: {
    width: "70%",
    padding: 4,
    margin: 10,
    color: "white",
    borderRadius: 20,
    backgroundColor: "blue",
    justifyContent: "center",
    textAlign: "center",
  },
});