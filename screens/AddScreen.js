import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TextInput, Text, ScrollView } from 'react-native';
//import * as ImagePicker from 'expo-image-picker';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import AddScreen from "./AddScreen";


import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();




export default function AddScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerTitle: "Add a new stall" }}
        name="AddScreen"
        component={ImagePickerExample}
      />
    </Stack.Navigator>
  );
}


function ImagePickerExample({ navigation }) {
  const [image, setImage] = useState(null);
  const [text, onChangeText] = React.useState("");
  const [text2, onChangeText2] = React.useState("");
  const [titleText, setTitleText] = useState("Shop Name");
  const [titleText2, setTitleText2] = useState("Location");


  const pickImage = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'android' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);


  const Separator = () => (
    <View style={styles.separator} />
  );
  
   const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [20, 50],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const cameraImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [20, 50],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


 

  return (

    <View style={styles.container}>

    <ScrollView
    showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
    <View style={styles.container1}>
      {image && <Image source={{ uri: image }} style={{ width: 246, height: 445 }} />}
      </View>
      <Separator />
      <Text style={styles.titleText}>
      Shop Name
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Text style={styles.titleText}>
      Location
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText2}
        value={text2}
      />
      <Button
        title="Submit"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
      </View>
    </ScrollView>


      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={cameraImage}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={pickImage}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>


    </View>
  );
}


const styles = StyleSheet.create({
  container1: {
    width: 250, 
    height: 450,
    borderWidth: 2,
    justifyContent: 'center'
  },
  container: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  titleText: {
    height: 25,
    width: 300,
    fontSize: 16,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
