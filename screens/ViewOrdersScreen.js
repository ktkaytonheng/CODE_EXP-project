import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  Layout,
  Button,
  Section,
  SectionContent,
  SectionImage,
} from "react-native-rapi-ui";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export default function ViewOrdersScreen({ navigation }) {
  return (
    <Layout>
      {/* need to change to image */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ width: 300, height: 200, backgroundColor: "red" }}
          source={{
            uri: "https://www.seriouseats.com/thmb/aU0v8MOtgRKLuru3HN3wC_f2a-s=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2011__09__20110906-singapore-primary-f061d429515a4aba8f52827545951f78.jpg",
          }}
          resizeMode="contain"
        />
      </View>
      <Section>
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
              <Text>Available Pax:XXXX</Text>{" "}
            </Text>
          </View>
        </SectionContent>
        <View>
          <View style={styles.button}>
            <Button
              onPress={() => navigation.navigate("AddGroupBuy")}
              text="Edit "
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
  logo: {
    width: 40,
    height: 40,
  },
});
