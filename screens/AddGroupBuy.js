import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Layout, Button } from "react-native-rapi-ui";
import { Section, SectionContent, SectionImage } from "react-native-rapi-ui";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export default function AddGroupBuy({ navigation }) {
  return (
    <Layout>
      {/* need to change to image */}
      <Section>
        <SectionImage source={require("../assets/image.jpg")} />
        <SectionContent>
          <View>
            <Text>
              <Text> Details:</Text>
            </Text>
            <Text>
              {" "}
              <Text>Location:</Text>{" "}
            </Text>
            <Text>
              {" "}
              <Text>Time:</Text>{" "}
            </Text>
            <Text>
              {" "}
              <Text>Available Pax:</Text>{" "}
            </Text>
          </View>
        </SectionContent>
        <View>
          <View style={styles.button}>
            <Button
              onPress={() => navigation.navigate("GroupBuyScreen")}
              text="Submit "
              size="lg"
            />
          </View>
        </View>
      </Section>
      ;
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
