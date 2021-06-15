import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AddListScreen from './AddListScreen';

import firebase from "../database/firebaseDB";

const db = firebase.firestore().collection("shopInfo");

function StallsScreen({ navigation }) {

  const [shopInfo, setShopInfo] = React.useState([]);

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

  function renderItem({ item }) {
    return (
      <TouchableOpacity
          onPress={() => {
          navigation.navigate('Add List', { ...item });
        }}>
            <View style={[styles.itemContainer]}>
            <ImageBackground source={{ uri: item.shopMenu }} style={styles.image}>
              <Text style={styles.itemName}>{item.shopName}</Text>
              <Text style={styles.itemCode}>{item.shopLocation}</Text>
            </ImageBackground>
            </View>
          </TouchableOpacity>
    );
  }

  return (
      <FlatGrid
        itemDimension={130}
        data={shopInfo}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={renderItem}
      />
  );
}

const Stack = createStackNavigator();

export default function StallsScreenStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="StallsScreen" component={StallsScreen} />
        <Stack.Screen name="Add List" component={AddListScreen} />
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
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
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
});