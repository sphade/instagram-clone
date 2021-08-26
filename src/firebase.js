// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAzKAy63wHbjE2sGhKuBGBrBMuBNixt0Jg",
  authDomain: "spotify-clone-cf668.firebaseapp.com",
  projectId: "spotify-clone-cf668",
  storageBucket: "spotify-clone-cf668.appspot.com",
  messagingSenderId: "509778058935",
  appId: "1:509778058935:web:b6963d3f3d1897e3793732",
  measurementId: "G-78PVSN9NS5",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage };
export default db;
