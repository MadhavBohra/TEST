import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1xHgcl1cJx0cxXu0aNuxSvhuW-Du1n4g",
  authDomain: "mept1-6519e.firebaseapp.com",
  projectId: "mept1-6519e",
  storageBucket: "mept1-6519e.appspot.com",
  messagingSenderId: "71655970970",
  appId: "1:71655970970:web:8c2bcf2d38f7975a8e2723",
  measurementId: "G-ZRPNX2HL7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const RecaptchaVerifierInstance = RecaptchaVerifier;

// Conditional import for analytics
let analytics;

if (typeof window !== 'undefined') {
  import('firebase/analytics').then(({ getAnalytics, isSupported }) => {
    if (isSupported()) {
      analytics = getAnalytics(app);
    }
  }).catch(error => {
    console.error('Failed to import Firebase Analytics:', error);
  });
}

export { app, auth, RecaptchaVerifierInstance, analytics };
