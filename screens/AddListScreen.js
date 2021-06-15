import React from "react";
import { Text, View, StyleSheet, Image, TextInput,TouchableOpacity } from "react-native";

export default function AddListScreen({ route }) {
  console.log(route.params);
  const { shopName, shopMenu} = route.params;

  return (
    <View style={styles.container}>
      <Text style={{margin:3, textAlign: 'center'}}>Location: {shopName}</Text>
      <View style={{alignItems:"center", justifyContent: 'center'}}>
        <Image style={styles.image} source={{uri: shopMenu}}/>
        <Text style={{fontSize: 20}}>Add List</Text>
        <TextInput style={styles.textArea} placeholder='Time' multiline="true"/>
        <TextInput style={styles.textArea} placeholder='Pax' multiline="true"/>
        <TextInput 
          style={styles.textArea}  
          placeholder='Location' 
          numberOfLines={4}
          multiline="true"
        />
        <TouchableOpacity style={styles.submit} onPress={console.log("hello")}>
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