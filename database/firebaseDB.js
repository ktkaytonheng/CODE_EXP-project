import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCto4rCbNaMedBAYVYn8ojsG1tuNxPEht8",
    authDomain: "code-exp-fbc9b.firebaseapp.com",
    projectId: "code-exp-fbc9b",
    storageBucket: "code-exp-fbc9b.appspot.com",
    messagingSenderId: "616914042524",
    appId: "1:616914042524:web:7e964d6e0f6962677cb759",
    measurementId: "G-48Q5YBLEKR"
};

firebase.initializeApp(firebaseConfig);
export default firebase;