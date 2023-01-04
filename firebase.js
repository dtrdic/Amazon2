import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB8YZEYQda5RjhIsOV-VbUjTm8rqqkQn_0",
  authDomain: "test-76388.firebaseapp.com",
  projectId: "test-76388",
  storageBucket: "test-76388.appspot.com",
  messagingSenderId: "159230101947",
  appId: "1:159230101947:web:bc0a1546b6c134a83cdc9e",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
