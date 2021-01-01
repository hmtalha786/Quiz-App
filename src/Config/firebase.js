import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDGm-QWOLMRJV-GYE0QX5GtNexhq4Whvjk",
    authDomain: "expensetrackerpwa-1a7b6.firebaseapp.com",
    databaseURL: "https://expensetrackerpwa-1a7b6.firebaseio.com",
    projectId: "expensetrackerpwa-1a7b6",
    storageBucket: "expensetrackerpwa-1a7b6.appspot.com",
    messagingSenderId: "606033826211",
    appId: "1:606033826211:web:217da2b0afc975231b4a16",
    measurementId: "G-8S9GQJS2ZE"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;