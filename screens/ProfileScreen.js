import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Permission,
} from "react-native";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import firebase from "../database/firebase";
import uuid from "uuid";
// import { utils } from "@react-native-firebase/app";

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export default function HomeScreen() {
  const [initialized, setInitialized] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [userID, setUserID] = useState("");
  // const [userInfo, setUserInfo] = useState({name: " ", email: " ", image: " "});
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState(" ");
  const [image, setImage] = useState("images/defaultdp.png");
  const [imageURL, setImageURL] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const notInitialRender = useRef(false);
  let history = useHistory();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [20, 50],
      quality: 1,
    });

    console.log(result);

    _handleImagePicked(result);
  };

  const cameraImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [20, 50],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setUploadedImage(result.uri);
    }
  };

  const _handleImagePicked = async (pickerResult) => {
    try {
      setUploadComplete(false);

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImageURL(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      setUploadComplete(true);
    }
  };
  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    console.log("blob: " + blob);
    const ref = firebase
      .storage()
      .ref()
      .child("images/" + userID);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    setUploadComplete(true);

    return await snapshot.ref.getDownloadURL();
  }
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Gained access to media");
        } else {
          console.log("Media access denied");
        }
      } else if (Platform.OS === "ios") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we require access to your media to upload photos");
        }
      }
    })();
  }, []);

  function SignOut() {
    auth
      .signOut()
      .then(() => console.log("User signed out"))
      .then(() => history.push("/"));
  }

  function SaveChanges() {
    let updatedParticulars = {
      name: name,
    };
    if (age != "") updatedParticulars.age = age;
    if (phoneNo != "") updatedParticulars.phoneNo = phoneNo;
    if (address != "") updatedParticulars.address = address;
    firestore.collection("Users").doc(userID).update(updatedParticulars);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("uid: " + user.uid);
        setUserID(user.uid);
      } else history.push("/");
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userID && notInitialRender.current) {
      firestore
        .collection("Users")
        .doc(userID)
        .onSnapshot((docSnapshot) => {
          const retrieved = docSnapshot.data();
          setName(retrieved.name);
          setEmail(retrieved.email);

          if (retrieved.age) setAge(retrieved.age);
          if (retrieved.phoneNo) setPhoneNo(retrieved.phoneNo);
          if (retrieved.image) setImage(retrieved.image);
          if (retrieved.address) setAddress(retrieved.address);
          setInitialized(true);
        });
    } else {
      notInitialRender.current = true;
    }
  }, [userID]);

  useEffect(() => {
    if (initialized) {
      storage
        .ref(image)
        .getDownloadURL()
        .then((url) => {
          console.log("URL: " + url);
          setImageURL(url);
        });
    }
  }, [initialized]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#f9c449", "#e8a49c", "#e8a49c"]}
        style={styles.subcontainerTop}
      >
        <TouchableOpacity
          onPress={pickImage}
          style={{
            borderRadius: 200,
            // backgroundColor: 'pink'
          }}
        >
          <Image source={{ uri: imageURL }} style={styles.displayPic} />
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.subcontainerBottom}>
        <View
          style={{
            // backgroundColor: 'pink',
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            width: "100%",
          }}
        >
          <View style={{ width: "70%", marginHorizontal: 10 }}>
            <TextInput
              label="Name"
              returnKeyType="next"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={{ width: "15%", marginHorizontal: 10 }}>
            <TextInput
              label="Age"
              returnKeyType="next"
              value={age}
              onChangeText={(text) => setAge(text)}
            />
          </View>
        </View>
        <View
          style={{
            // backgroundColor: 'pink',
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <View
            style={{
              width: "90%",
              marginHorizontal: 10,
              marginVertical: 5,
            }}
          >
            <Text style={{ textAlign: "left" }}>-- Contact Details --</Text>
          </View>
          <View
            style={{
              width: "90%",
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          >
            <TextInput
              label="Phone Number"
              returnKeyType="next"
              value={phoneNo}
              onChangeText={(text) => setPhoneNo(text)}
            />
          </View>
          <View
            style={{
              width: "90%",
              marginHorizontal: 10,
              marginVertical: 5,
            }}
          >
            <TextInput
              label="Address"
              returnKeyType="next"
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
        </View>

        <View
          style={{
            width: "40%",
            justifyContent: "flex-end",
            // backgroundColor: 'pink',
          }}
        >
          <TouchableOpacity style={styles.button} onPress={() => SaveChanges()}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                // backgroundColor: 'pink',
              }}
            >
              <FontAwesome name="save" size="20" color="green" />
              <Text style={styles.buttonText}>Save changes</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "40%",
            justifyContent: "flex-end",
            // backgroundColor: 'pink',
          }}
        >
          <TouchableOpacity style={styles.button} onPress={() => SignOut()}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                // backgroundColor: 'pink',
              }}
            >
              <FontAwesome name="sign-out" size="20" color="red" />
              <Text style={styles.buttonText}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  subcontainerTop: {
    paddingTop: "10%",
    // paddingBottom: "10%",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  subcontainerBottom: {
    flex: 1,
    paddingTop: "5%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  displayPic: {
    borderRadius: 250,
    borderColor: "black",
    borderWidth: 5,
    height: 250,
    width: 250,
  },
  // displayName: {
  //   fontSize: 40,
  //   // fontFamily: 'roboto',
  //   marginTop: 40,
  // },
  button: {
    width: "100%",
    height: 40,
    // alignItems: 'center',
    justifyContent: "center",
    // marginBottom: 36,
    // justifyContent: 'flex-end',
    // backgroundColor: 'black'
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    marginHorizontal: 10,
  },
});
