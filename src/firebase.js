import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-DOZvi0uSqYPB4Q2hZ7RpJSbHEnX0rTg",
  authDomain: "what-s-app-clone-20a44.firebaseapp.com",
  projectId: "what-s-app-clone-20a44",
  storageBucket: "what-s-app-clone-20a44.appspot.com",
  messagingSenderId: "898654772374",
  appId: "1:898654772374:web:d687cc91afe8f45c26b6b7",
  measurementId: "G-4WC2BDC8Y5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
