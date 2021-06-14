import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Layout, Section, SectionContent } from "react-native-rapi-ui";
import { Button } from "react-native-rapi-ui";

import AddGroupBuy from "./AddGroupBuy";
import { createStackNavigator } from "@react-navigation/stack";
import ViewOrdersScreen from "./ViewOrdersScreen";
const Stack = createStackNavigator();
function GroupBuyScreen({ navigation }) {
  return (
    <Layout>
      <Section>
        <SectionContent>
          {/* need to change to image */}
          <View style={styles.button}>
            <Button
              text="Order Group buy "
              onPress={() => navigation.navigate("AddGroupBuy")}
              size="lg"
            />
          </View>
          <View style={styles.button}>
            <Button
              text="View Last orders "
              onPress={() => navigation.navigate("ViewOrdersScreen")}
              size="lg"
            />
          </View>
        </SectionContent>
      </Section>
    </Layout>
  );
}
const styles = StyleSheet.create({
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
});
export default function GroupBuyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GroupBuyScreen" component={GroupBuyScreen} />
      <Stack.Screen name="AddGroupBuy" component={AddGroupBuy} />
      <Stack.Screen name="ViewOrdersScreen" component={ViewOrdersScreen} />
    </Stack.Navigator>
  );
}
