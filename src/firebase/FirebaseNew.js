// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
let firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyD45Dr2TOdMahTvx47t6GYM4j5Cc_9iJxw",
  authDomain: "time-table-desktop-app.firebaseapp.com",
  projectId: "time-table-desktop-app",
  storageBucket: "time-table-desktop-app.appspot.com",
  messagingSenderId: "212656474388",
  appId: "1:212656474388:web:49f8bb039316d452f71a01",
  measurementId: "G-LPZJ66W56H",
});

const db = firebaseConfig.firestore();

export { db };
