import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import HomeScreen from "../screens/HomeScreen";
import GroupBuyScreen from "../screens/GroupBuyScreen";
import ListingScreen from "../screens/ListingScreen";
import AddScreen from "../screens/AddScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export default function TabNavigatorScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            //Set the icon based on which route it is (name of the tab)
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Group buy") {
              iconName = "credit-card";
            } else if (route.name === "Listing") {
              iconName = "list";
            } else if (route.name === "Add place") {
              iconName = "plus-circle";
            } else if (route.name === "Profile") {
              iconName = "user";
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Group buy" component={GroupBuyScreen} />
        <Tab.Screen name="Listing" component={ListingScreen} />
        <Tab.Screen name="Add place" component={AddScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
