import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';
import { createStackNavigator } from '@react-navigation/stack';
import AddListScreen from './AddListScreen';
import EditListDetailScreen from "./EditListDetailScreen";
import { SearchBar } from 'react-native-elements';


import firebase from "../database/firebaseDB";

const db = firebase.firestore().collection("shopInfo");

function StallsScreen ({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => navigation.navigate("My listing")} title="My listings" />,
    });
  });

  const [shopInfo, setShopInfo] = React.useState([]);
  const [text , setText] = React.useState("");

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("shopInfo")
      .onSnapshot((collection) => {
        const updatedShopInfo = collection.docs.map((doc) => doc.data());
        setShopInfo(updatedShopInfo);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  updateSearch = (search) => {
    this.setState({ search });
  };

  function renderItem({ item }) {
    return (
      <View>
        <Text style={styles.itemName}>{item.shopName}</Text>
        <TouchableOpacity
            onPress={() => {
            navigation.navigate("Add List", { ...item });
          }}>
              <View style={[styles.itemContainer]}>
              <ImageBackground source={{ uri: item.shopMenu }} style={styles.image}>
                <Text style={styles.itemCode}>{item.shopLocation}</Text>
              </ImageBackground>
              </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SectionGrid
      itemDimension={130}
      // staticDimension={300}
      // fixed
      // spacing={20}
      sections={[
        {
          title: 'Title1',
          data: shopInfo.slice(0, 10000),
        },
      ]}
      style={styles.gridView}
      renderItem={renderItem}
      renderSectionHeader={({ section }) => (
        <SearchBar
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 10}}
        placeholderTextColor={'#g5g5g5'}
        placeholder="Search"
        onChangeText={ (text) => {
          setText(text);
          if(text == ""){
            firebase
            .firestore()
            .collection("shopInfo")
            .onSnapshot((collection) => {
              const updatedShopInfo = collection.docs.map((doc) => doc.data());
              setShopInfo(updatedShopInfo);
            });
          }
          else{
            const unsubscribe = firebase
            .firestore()
            .collection("shopInfo")
            .where('shopName', '>=', text.toUpperCase())
            .where('shopName', '<=', text+ '\uf8ff')
            .onSnapshot((collection) => {
              const updatedShopInfo = collection.docs.map((doc) => doc.data());
              setShopInfo(updatedShopInfo);
            })
            //console.warn(text);
            }}
          }
        value={text}
        />
      )}
    />
  );
}

const Stack = createStackNavigator();

export default function StallsScreenStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="StallsScreen" component={StallsScreen} />
        <Stack.Screen name="Add List" component={AddListScreen} />
        <Stack.Screen name="My listing" component={EditListDetailScreen} />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 150,
    
  },
  itemName: {
    fontSize: 10,
    color: 'black',
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: '#636e72',
    color: 'white',
    padding: 10,
  },
});