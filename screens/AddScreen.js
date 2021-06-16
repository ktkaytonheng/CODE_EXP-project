import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';
//import ImagePicker from 'react-native-image-crop-picker';
import AddScreen from "./AddScreen";
import { showAlert } from "react-native-customisable-alert";



import storage from '@react-native-firebase/storage';
import firebase from "../database/firebaseDB";


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
      [
      
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );


  function UploadImageToStorage(path, imageName) {
    let reference = storage.ref(imageName);
    let task = reference.putFile(path);

    task.then(() => {
      console.log("Imageuploaded to the bucket");
    });
  }



//   state = {
//     imagePath: require("./img/default.jpg"),
//     isLoading: false,
//     status: '',
// }

// chooseFile = () => {
//     this.setState({ status: '' });
//     var options = {
//         title: 'Select Image',
//         customButtons: [
//             { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
//         ],
//         storageOptions: {
//             skipBackup: true, // do not backup to iCloud
//             path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
//         },
//     };
//     ImagePicker.showImagePicker(options, response => {
//         if (response.didCancel) {
//             console.log('User cancelled image picker', firebase.storage());
//         } else if (response.error) {
//             console.log('ImagePicker Error: ', response.error);
//         } else if (response.customButton) {
//             console.log('User tapped custom button: ', response.customButton);
//         } else {
//             let path = this.getPlatformPath(response).value;
//             let fileName = this.getFileName(response.fileName, path);
//             this.setState({ imagePath: path });
//             this.uploadImageToStorage(path, fileName);
//         }
//     });
// };

// getFileName(name, path); {
//     if (name != null) { return name; }

//     if (Platform.OS === "ios") {
//         path = "~" + path.substring(path.indexOf("/Documents"));
//     }
//     return path.split("/").pop();
// }

// uploadImageToStorage(path, name); {
//     this.setState({ isLoading: true });
//     let reference = firebase.storage().ref(name);
//     let task = reference.putFile(path);
//     task.then(() => {
//         console.log('Image uploaded to the bucket!');
//         this.setState({ isLoading: false, status: 'Image uploaded successfully' });
//     }).catch((e) => {
//         status = 'Something went wrong';
//         console.log('uploading image error => ', e);
//         this.setState({ isLoading: false, status: 'Something went wrong' });
//     });
// }

// /**
//  * Get platform specific value from response
//  */
// getPlatformPath({ path, uri }); {
//     return Platform.select({
//         android: { "value": path },
//         ios: { "value": uri }
//     })
// }

// getPlatformURI(imagePath); {
//     let imgSource = imagePath;
//     if (isNaN(imagePath)) {
//         imgSource = { uri: this.state.imagePath };
//         if (Platform.OS == 'android') {
//             imgSource.uri = "file:///" + imgSource.uri;
//         }
//     }
//     return imgSource
// }



  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     width: 1200,
  //     height: 780,
  //     cropping: true,
  //   }).then((image) => {
  //     console.log(image);
  //     const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
  //     setImage(imageUri);
  //   });
  // };

  // const choosePhotoFromLibrary = () => {
  //   ImagePicker.openPicker({
  //     width: 1200,
  //     height: 780,
  //     cropping: true,
  //   }).then((image) => {
  //     console.log(image);
  //     const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
  //     setImage(imageUri);
  //   });
  // };


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
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);
    
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
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      setPost(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });

    return () => {
      unsubscribe();
    };
  }, []);
    };
  




  const uploadImage = async () => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = firebase.storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      Alert.alert(
        'Image uploaded!',
        'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      );
      return url;

    } catch (e) {
      console.log(e);
      return null;
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
      Shop Name:
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Text style={styles.titleText}>
      Location:
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText2}
        value={text2}
      />
       <Text style={styles.titleText}>
      Contact Number: (+65)
      </Text>
      <TextInput
        keyboardType='numeric'
        style={styles.input}
        onChangeText={onChangeText3}
        value={text3}
        Type = 'flat'
      />
       <Text style={styles.titleText}>
      Operating Hours: (24hrs Format)
      </Text>
      <TextInput
        keyboardType='numeric'
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
          onPress={cameraImage}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#ffc0cb"
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
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 100,
},
});
