import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-paper";
//import ImagePicker from 'react-native-image-crop-picker';
import AddScreen from "./AddScreen";
import { LinearGradient } from "expo-linear-gradient";

// import storage from "@react-native-firebase/storage";
import firebase from "../database/firebase";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

// const reference = storage().ref('black-t-shirt-sm.png');

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
  const [text3, onChangeText3] = React.useState("");
  const [text4, onChangeText4] = React.useState("");
  const [titleText3, setTitleText3] = React.useState("");
  const [titleText4, setTitleText4] = useState("");

  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

  const [errorText, setErrorText] = useState(" ");
  const [errorTextColor, setErrorTextColor] = useState("red");

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Upload success",
      "You have successfully saved a hawker stall!",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );

  function UploadImageToStorage(path, imageName) {
    let reference = storage.ref(imageName);
    let task = reference.putFile(path);

    task.then(() => {
      console.log("Imageuploaded to the bucket");
    });
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const Separator = () => <View style={styles.separator} />;

  const pickImage = async () => {
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

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log("Image Url: ", imageUrl);
    console.log("Post: ", post);

    useEffect(() => {
      const unsubscribe = firebase
        .firestore()
        .collection("Orders")
        .add({
          userId: user.uid,
          post: post,
          postImg: imageUrl,
          // postTime: firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log("Post Added!");
          Alert.alert(
            "Post published!",
            "Your post has been published Successfully!"
          );
          setPost(null);
        })
        .catch((error) => {
          console.log(
            "Something went wrong with added post to firestore.",
            error
          );
        });

      return () => {
        unsubscribe();
      };
    }, []);
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

    // Add timestamp to File Name
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = firebase.storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      Alert.alert(
        "Image uploaded!",
        "Your image has been uploaded to the Firebase Cloud Storage Successfully!"
      );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <LinearGradient colors={["#ffc", "#ffc", "#ffc"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.container1}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 246, height: 445 }}
              />
            )}
          </View>
          <Separator />
          <Text style={styles.titleText}>Shop Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <Text style={styles.titleText}>Location:</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText2}
            value={text2}
          />
          <Text style={styles.titleText}>Contact Number: (+65)</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            onChangeText={onChangeText3}
            value={text3}
            Type="flat"
          />
          <Text style={styles.titleText}>Operating Hours: (24hrs Format)</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            onChangeText={onChangeText4}
            value={text4}
          />
          <Separator />
          <Button
            style={styles.buttonContainer}
            title="Submit"
            // onPress={submitPost}
            onPress={createTwoButtonAlert}
          />
        </View>
      </ScrollView>

      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#FF7F50"
          title="Take Photo"
          onPress={cameraImage}
        >
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#ffc0cb"
          title="Choose Photo"
          onPress={pickImage}
        >
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container1: {
    width: 250,
    height: 450,
    borderWidth: 2,
    justifyContent: "center",
  },
  container: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
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
    color: "white",
  },
  titleText: {
    height: 25,
    width: 300,
    fontSize: 16,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonContainer: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 100,
  },
});
