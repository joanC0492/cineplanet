import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAi_9aTxjsIrJmyA-eIbYM59ktWArFUzog",
  authDomain: "cineplanet-b9e13.firebaseapp.com",
  projectId: "cineplanet-b9e13",
  storageBucket: "cineplanet-b9e13.appspot.com",
  messagingSenderId: "648932571360",
  appId: "1:648932571360:web:4be60ad9f0bce13fea7885",
  measurementId: "G-GWHF28YV72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth};