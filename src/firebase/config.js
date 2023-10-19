import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_firebase_apiKey,
  authDomain: "brown-cs-ipp.firebaseapp.com",
  projectId: "brown-cs-ipp",
  storageBucket: "brown-cs-ipp.appspot.com",
  messagingSenderId: process.env.REACT_APP_firebase_messagingSenderId,
  appId: process.env.REACT_APP_firebase_appId,
  measurementId: process.env.REACT_APP_firebase_measurementId,
  // databaseURL: process.env.REACT_APP_firebase_databaseURL
};


export const firebase_app = initializeApp(firebaseConfig);