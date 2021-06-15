import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "../database/firebaseDB";

const db = firebase.firestore().collection("Listing");


import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Button,
    TextInput,
  } from "react-native";

  const SAMPLE_REMARKS = [
    { title: "Walk the cat", id: "0"},
    { title: "Water the cat", id: "1"},
  ];


function NotesScreen({navigation}){

    const [remarks, setRemarks] = useState([]);

    useEffect(() => {
      const unsubscribe = firebase
        .firestore()
        .collection("Listing")
        .onSnapshot((collection) => {
          const updatedRemarks = collection.docs.map((doc) => doc.data());
          setRemarks(updatedRemarks);
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
           
            borderBottomColor: "#ccc",
            borderBottomWidth: 2,
         
          }}
        >
          <Text style={[styles.customerName]}> 
                {item.Customer}</Text>
          <Text style={[styles.customerRemark]}>
              {item.Remarks}</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <FlatList
          data={remarks}
          renderItem={renderItem}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
}

const Stack = createStackNavigator();

export default function EditListDetailScreen() {

    return (
            <Stack.Navigator>
                <Stack.Screen
                    name= "Notes"
                    component= {NotesScreen}
                />
            </Stack.Navigator>

    );

    
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffc",
      alignItems: "center",
      justifyContent: "center",
    },
    listImage: {
      width: 50,
      height: 50,
    },
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
    
    customerName : {
        fontSize : 15,
        textAlign : "left",
        color:"black",
        padding:10,
        paddingLeft:20,
        top:1,


   
    },

    customerRemark : {
        fontSize : 12,
        textAlign : "left",
        color:"black",
        paddingTop: 25,
        paddingBottom: 50,
        paddingLeft : 120,
        paddingRight: 10,
        
       
    }
  });
  