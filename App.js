import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import GroupBuyScreen from "./screens/GroupBuyScreen";

import { createStackNavigator } from "@react-navigation/stack";
import ListingScreen from "./screens/ListingScreen";
import AddScreen from "./screens/AddScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EditListDetailScreen from "./screens/EditListDetailScreen";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function App() {
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
        <Tab.Screen name="Listing" component={EditListDetailScreen} />
        <Tab.Screen name="Add place" component={AddScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
