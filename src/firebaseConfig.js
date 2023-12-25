// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "Your Api Key",
  authDomain: "Your auth domain",
  projectId: "Your project id",
  storageBucket: "Your storage bucket",
  messagingSenderId: "Your messaging sender id",
  appId: "Your app id",
  measurementId: "Your measurement id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
export {auth, analytics, sendSignInLinkToEmail};

