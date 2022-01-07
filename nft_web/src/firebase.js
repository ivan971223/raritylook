import "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhZWHQix6tAOTH0B3i2XEPAGv88XjwyKY",
  authDomain: "coffee-app-f845e.firebaseapp.com",
  databaseURL: "https://coffee-app-f845e.firebaseio.com",
  projectId: "coffee-app-f845e",
  storageBucket: "coffee-app-f845e.appspot.com",
  messagingSenderId: "231261846462",
  appId: "1:231261846462:web:0abbab8bcc575ba5f517ef",
  measurementId: "G-6BRZG3SK0R"
  // this is where your firebase config goes
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
// const db = firebase.firestore()

// export { auth, provider }
// export default db

export { auth, provider }
export default app